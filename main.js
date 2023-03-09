var song1 = ""
var song2 = ""
var song1Status = ""
var song2Status = ""
var pulsoDX = 0
var pulsoEX = 0
var pulsoDY = 0
var pulsoEY = 0
var pontuacaoPulsoE = 0
var pontuacaoPulsoD = 0


function preload() {
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(600,500)
    canvas.center
    camera = createCapture(VIDEO)
    camera.hide()
    posenet = ml5.poseNet(camera, modelLoaded)
    posenet.on("pose", gotPoses)
}

function draw() {
    image(camera, 0,0,600,500)
    song1Status = song1.isPlaying()
    song2Status = song2.isPlaying()
    fill("white")
    stroke("white")
    if (pontuacaoPulsoD>0.2) {
        circle(pulsoDX, pulsoDY, 20)  
        song2.stop()
        if (song1Status==true) {
            song1.play()
            document.getElementById("song").innerHTML = "Tocando: tema de Harry Potter"
        }
    }
    if (pontuacaoPulsoE>0.2) {
        circle(pulsoEX, pulsoEY, 20)  
        song1.stop()
        if (song2Status==true) {
            song2.play()
            document.getElementById("song").innerHTML = "Tocando: música do Peter Pan"
        }
    }
}

function reproduzir() {
    audio.play()
    audio.setVolume(0.5)
    audio.rate(1)
}

function modelLoaded() {
    console.log("Modelo carregado")
}

function gotPoses(results,error) {
    if (results.length>0) {
        console.log(results)
        pontuacaoPulsoD = results[0].pose.keypoints[10].score
        pontuacaoPulsoE = results[0].pose.keypoints[9].score
        pulsoEX = results[0].pose.leftWrist.x
        pulsoDX = results[0].pose.rightWrist.x
        pulsoEY = results[0].pose.leftWrist.y
        pulsoDY = results[0].pose.rightWrist.y
    }
}
