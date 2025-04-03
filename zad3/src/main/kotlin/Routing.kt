package com.example

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import net.dv8tion.jda.api.JDABuilder

fun Application.configureRouting() {
    routing {
        get("/") {
            val resultMessage = sendDiscordMessage()
            call.respondText(resultMessage)
        }
        get("reply") {
            val botToken = readFromFile("botToken.txt")
            JDABuilder.createDefault(botToken)
                .addEventListeners(MessageListener())
                .build()
            call.respondText("Wpisz: [hello | how are you | categories | items <CATEGORY_NAME>]")
        }
    }
}
