package com.example

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import kotlinx.coroutines.launch
import java.io.File

fun main() {
    embeddedServer(Netty, port = 8080, module = Application::module).start(wait = true)
}

fun Application.module() {
    configureRouting()
}

suspend fun Application.sendDiscordMessage() : String {
    val client = HttpClient(CIO)
    val webhookUrl = readFromFile("webhook.txt")
    val message = readFromFile("message.txt")

    if (webhookUrl.isNullOrEmpty()) {
        return "Webhook URL nie został znaleziony w pliku"
    }

    try {
        val response: HttpResponse = client.post(webhookUrl) {
            contentType(ContentType.Application.Json)
            setBody("{\"content\":\"$message\"}")
        }
        val status = response.status
        val body = response.bodyAsText()
        return "Wiadomość wysłana, status: $status\nOdpowiedź Discorda: $body"
    } catch (e: Exception) {
        return "Błąd przy wysyłaniu wiadomości: $e"
    } finally {
        client.close()
    }
}

fun readFromFile(filename: String): String? {
    return try {
        val file = File(filename)
        if (file.exists()) {
            file.readText().trim()
        } else {
            null
        }
    } catch (e: Exception) {
        println("Błąd przy odczycie pliku: $e")
        null
    }
}
