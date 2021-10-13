objects = [];
status = "";

function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 400, 400);

    if(status!=""){
        objectDetector.detect(video, gotResults);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            object = document.getElementById("object_name").value;
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#91E5B2");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label==object){
                document.getElementById("number_of_objects").innerHTML = "Object Found"
            }
    }
}
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status – Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        objects = results;
        console.log(objects);
    }
}