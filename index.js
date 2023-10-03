import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const endorsementInputEl = document.getElementById("endorsement-input")
const fromInputeEl = document.getElementById("from-input")
const toInputEl = document.getElementById("to-input")
const publishButtonEl = document.getElementById("publish-button")
const publishedEndorsementEl = document.getElementById("published-endorsement")


const appSettings = {
    databaseURL: "https://playground-fc822-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

onValue(endorsementsInDB, function (snapshot) {

    if (snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())

        clearEndorsementEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentSender = currentItem[1].sender
            let currentReceiver = currentItem[1].receiver
            let currentMessage = currentItem[1].message

            appendItemToPublishedEndorsementEl(currentSender, currentMessage, currentReceiver)
        }
    }
})

function clearEndorsementEl() {
    publishedEndorsementEl.innerHTML = ""
}

function clearallFields() {
    endorsementInputEl.value = ""
    fromInputeEl.value = ""
    toInputEl.value = ""
}

function appendItemToPublishedEndorsementEl(sender, message, receiver) {
    let newSender = document.createElement("h4")
    newSender.setAttribute("id", "sender-name")
    newSender.textContent = "From: " + sender

    let newMessage = document.createElement("p")
    newMessage.textContent = message

    let newReceiver = document.createElement("h4")
    newReceiver.textContent = "To: " + receiver

    let separator = document.createElement("div")
    separator.setAttribute("id", "separator")

    let likes = document.createElement("button")
    likes.setAttribute("id", "like-button")
    likes.textContent = "❤"

    let clicked = false
    let numberOfLikes = 0

    if (clicked == false) {
        likes.addEventListener("click", function () {
            let clicked = true
            likes.textContent = "❤ " + (numberOfLikes + 1)
        })
    }

    publishedEndorsementEl.append(separator, likes, newSender, newMessage, newReceiver)

}


publishButtonEl.addEventListener("click", function () {
    let inputValue = endorsementInputEl.value
    let senderValue = fromInputeEl.value
    let receiverValue = toInputEl.value

    let infoRequired = {
        sender: senderValue,
        message: inputValue,
        receiver: receiverValue,
    }

    push(endorsementsInDB, infoRequired)
    clearallFields()
})