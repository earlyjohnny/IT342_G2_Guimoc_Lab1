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
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val btnRegister = findViewById<Button>(R.id.btnDoRegister)

        btnRegister.setOnClickListener {
            val user = User(
                username = findViewById<EditText>(R.id.etRegUsername).text.toString(),
                firstName = findViewById<EditText>(R.id.etRegFirstName).text.toString(),
                lastName = findViewById<EditText>(R.id.etRegLastName).text.toString(),
                email = findViewById<EditText>(R.id.etRegEmail).text.toString(),
                password = findViewById<EditText>(R.id.etRegPassword).text.toString()
            )

            val service = RetrofitClient.instance.create(AuthService::class.java)
            lifecycleScope.launch {
                try {
                    val response = service.register(user)
                    if (response.isSuccessful) {
                        Toast.makeText(this@RegisterActivity, "Account Created!", Toast.LENGTH_SHORT).show()
                        finish() // Returns to Login screen
                    } else {
                        Toast.makeText(this@RegisterActivity, "Registration Failed", Toast.LENGTH_SHORT).show()
                    }
                } catch (e: Exception) {
                    Toast.makeText(this@RegisterActivity, "Network Error: ${e.message}", Toast.LENGTH_LONG).show()
                }
            }
        }

        val tvToLogin = findViewById<TextView>(R.id.tvBackToLogin)
        val fullText = "Already have an account? Login here"
        val spannable = SpannableString(fullText)


        val pinkClick = object : ClickableSpan() {
            override fun onClick(widget: View) {
                finish()
            }
            override fun updateDrawState(ds: TextPaint) {
                super.updateDrawState(ds)
                ds.color = Color.parseColor("#f5576c")
                ds.isUnderlineText = true
                ds.isFakeBoldText = true
            }
        }

        spannable.setSpan(pinkClick, 25, fullText.length, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
        tvToLogin.text = spannable
        tvToLogin.movementMethod = LinkMovementMethod.getInstance()
    }
}