package com.example.userauth

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.text.SpannableString
import android.text.Spanned
import android.text.TextPaint
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        findViewById<Button>(R.id.btnDoLogin).setOnClickListener {
            val username = findViewById<EditText>(R.id.etLoginUsername).text.toString()
            val password = findViewById<EditText>(R.id.etLoginPassword).text.toString()

            val service = RetrofitClient.instance.create(AuthService::class.java)
            lifecycleScope.launch {
                try {
                    val response = service.login(LoginRequest(username, password))
                    if (response.isSuccessful) {
                        val token = response.body() ?: ""

                        val prefs = getSharedPreferences("user_auth", MODE_PRIVATE)
                        prefs.edit().putString("auth_token", token).apply()

                        startActivity(Intent(this@LoginActivity, DashboardActivity::class.java))
                        finish()
                    }
                } catch (e: Exception) {
                    Toast.makeText(this@LoginActivity, "Error: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
        val tvToRegister = findViewById<TextView>(R.id.tvToRegister)
        val fullText = "Don't have an account? Register here"
        val spannable = SpannableString(fullText)


        val blueClick = object : ClickableSpan() {
            override fun onClick(widget: View) {
                startActivity(Intent(this@LoginActivity, RegisterActivity::class.java))
            }
            override fun updateDrawState(ds: TextPaint) {
                super.updateDrawState(ds)
                ds.color = Color.parseColor("#2196F3")
                ds.isUnderlineText = true // Match web link style
                ds.isFakeBoldText = true
            }
        }

        spannable.setSpan(blueClick, 23, fullText.length, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
        tvToRegister.text = spannable
        tvToRegister.movementMethod = LinkMovementMethod.getInstance()
    }
}