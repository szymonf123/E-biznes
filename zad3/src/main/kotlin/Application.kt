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
    sendDiscordMessage()
}

fun Application.sendDiscordMessage() {
    val client = HttpClient(CIO)
    val webhookUrl = readFromFile("webhook.txt")
    val message = readFromFile("message.txt")

    if (webhookUrl.isNullOrEmpty()) {
        println("Webhook URL nie został znaleziony w pliku.")
        return
    }

    launch {
        try {
            val response: HttpResponse = client.post(webhookUrl) {
                contentType(ContentType.Application.Json)
                setBody("{\"content\":\"$message\"}")
            }
            println("Wiadomość wysłana, status: ${response.status}")
            println("Odpowiedź Discorda: ${response.bodyAsText()}")
        } catch (e: Exception) {
            println("Błąd przy wysyłaniu wiadomości: $e")
        } finally {
            client.close()
        }
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
