package com.example.userauth

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface AuthService {
    @POST("auth/register")
    suspend fun register(@Body user: User): Response<User>

    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<String>

    @GET("user/me")
    suspend fun getCurrentUser(@Header("Authorization") token: String): Response<User>
}