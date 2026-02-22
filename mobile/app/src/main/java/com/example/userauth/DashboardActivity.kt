package com.example.userauth

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch

class DashboardActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        val prefs = getSharedPreferences("user_auth", MODE_PRIVATE)
        val token = prefs.getString("auth_token", null)

        // PROTECTION: Kick out if not logged in
        if (token == null) {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
            return
        }

        fetchProfile("Bearer $token")

        // LOGOUT: Clear token and return to Login
        findViewById<Button>(R.id.btnLogout).setOnClickListener {
            prefs.edit().clear().apply()
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }

    private fun fetchProfile(header: String) {
        val service = RetrofitClient.instance.create(AuthService::class.java)
        lifecycleScope.launch {
            val response = service.getCurrentUser(header)
            if (response.isSuccessful) {
                val user = response.body()
                findViewById<TextView>(R.id.tvWelcome).text = "Welcome, ${user?.firstName}!"
                findViewById<TextView>(R.id.tvEmail).text = "Email: ${user?.email}"
            }
        }
    }
}