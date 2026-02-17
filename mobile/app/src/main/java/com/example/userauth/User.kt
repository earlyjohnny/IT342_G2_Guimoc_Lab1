package com.example.userauth

data class User(
    val id: Long? = null,
    val username: String,
    val firstName: String,
    val email: String,
    val password: String? = null
)