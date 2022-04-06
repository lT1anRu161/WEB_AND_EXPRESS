const cool = require('cool-ascii-faces')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let notes = [
    {
        "id": 1,
        "content": "HTML is easy",
        "date": "2019-05-30T17:30:31.098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "date": "2019-05-30T18:39:34.091Z",
        "important": true
    },
    {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2019-05-30T19:20:14.298Z",
        "important": false
    },
    {
        "id": 4,
        "content": "The is a love day!!!",
        "date": "2022-03-30T06:43:07.531Z",
        "important": true
    },
    {
        "id": 5,
        "content": "react is good~",
        "date": "2022-03-30T07:07:30.335Z",
        "important": false
    },
    {
        "id": 6,
        "content": "my name is very happy",
        "date": "2022-03-30T10:34:58.501Z",
        "important": true
    },
    {
        "id": 7,
        "content": "I guess your life",
        "date": "2022-03-30T10:40:05.179Z",
        "important": false
    },
    {
        "id": 8,
        "content": "i am sad┭┮﹏┭┮",
        "date": "2022-03-30T15:04:06.104Z",
        "important": true
    },
    {
        "id": 9,
        "content": "my name is explife0011!",
        "date": "2022-03-30T15:44:16.001Z",
        "important": false
    }
]

const generateId = () => {
    const maxId = Math.max(...notes.map(note => note.id))
    return maxId + 1
}

app.get('/', (req, res) => {
    res.send('<h1>hello express</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if(note)
    {
        res.json(note)
    }
    else
    {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const note = req.body
    console.log(note)

    if(!note.content)
    {
        return res.status(404).json({
            "error": "missing content"
        })
    }

    let newNote = {
        id: generateId(),
        content: note.content,
        date: new Date(),
        important: note.important || false
    }

    notes = notes.concat(newNote)

    res.json(newNote)
})

app.get('/cool', (req, res) => {
    res.send(cool())
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Web Server running at http://localhost:${PORT}`)
})
