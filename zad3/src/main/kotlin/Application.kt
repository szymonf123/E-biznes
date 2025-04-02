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

import net.dv8tion.jda.api.JDABuilder
import net.dv8tion.jda.api.entities.Message
import net.dv8tion.jda.api.entities.TextChannel
import net.dv8tion.jda.api.hooks.ListenerAdapter
import net.dv8tion.jda.api.events.message.MessageReceivedEvent

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

val categoriesAndItems = mapOf(
    "Sport" to listOf("Football", "Basketball", "Volleyball"),
    "Electronics" to listOf("TV", "Smartphone", "Smartwatch", "Tablet"),
    "Clothes" to listOf("T-shirt", "Jeans", "Cap", "Socks")
)

class MessageListener : ListenerAdapter() {
    fun responseByItems(items : Collection<String>) : String {
        var response: String = ""
        for (item in items) {
            response += item
            response += "\n"
        }
        return response
    }
    override fun onMessageReceived(event: MessageReceivedEvent) {
        val message: Message = event.message
        val channel: TextChannel = event.textChannel

        if (event.author.isBot) return
        if (message.contentRaw.equals("hello", true)) {
            channel.sendMessage("Hello, user!").queue()
        }
        else if (message.contentRaw.equals("how are you", true)) {
            channel.sendMessage("I'm fine. Thanks!").queue()
        }
        else if (message.contentRaw.equals("categories", true)) {
            channel.sendMessage(responseByItems(categoriesAndItems.keys)).queue()
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
