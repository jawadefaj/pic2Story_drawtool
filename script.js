/* eslint-env es6 */
/* eslint-disable */
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const penColor = document.querySelector('input[name="penColor"]');
const penWidth = document.querySelector('input[name="penWidth"]');
const saver = document.querySelector('#saver')


ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round'
ctx.lineWidth = 5;
let pen = {
    x:0,
    y:0,
    down:false
}

let image = {
    x_h:-1,
    y_h:-1,
    x_l:800,
    y_l:600
}

saver:addEventListener('dblclick', saveFile);
canvas.addEventListener('mousedown', penDown);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', noDown);
canvas.addEventListener('mouseout', noDown);



function draw(e){
    if(!pen.down) return;
    ctx.lineWidth = penWidth.value;
    ctx.strokeStyle = penColor.value;
    ctx.beginPath();
    ctx.moveTo(pen.x, pen.y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [pen.x, pen.y] = [e.offsetX, e.offsetY];
    if(pen.x > image.x_h) image.x_h = pen.x;
    if(pen.x < image.x_l) image.x_l = pen.x;
    if(pen.y > image.y_h) image.y_h = pen.y;
    if(pen.y < image.y_l) image.y_l = pen.y;
}

function noDown(){
    pen.down = false;
}

function penDown(e){
    pen.down = true;
    [pen.x, pen.y] = [e.offsetX, e.offsetY];
    
}



function saveFile(){
    console.log(image.x_h);
    console.log(image.x_l);
    console.log(image.y_h);
    console.log(image.y_l);
    image_height = image.y_h - image.y_l;
    image_width = image.x_h - image.x_l;
    threshold = 10;
    let _image = canvas.toDataURL();
    var bitmap_image = ctx.getImageData(image.x_l-threshold, image.y_l-threshold, image_width + 2*threshold, image_height + 2*threshold);
    
    ctx.putImageData(bitmap_image, 0, 0);
    
    temp_image = _image;
    
    //console.log(bitmap_image);
    
    //console.log(temp_image);
    
    gettext_GPT();
    
}

function gettext_GPT(){
    var p = document.getElementById('story');
    url = 'http://localhost:9000/api/doodle2story';
    
    $.ajax({
         url:url,
         success:function(json){
             // do stuff with json (in this case an array)
             alert("Success");
             console.log(json);
             p.innerHTML = JSON.parse(json).data;
         },
         error:function(){
             alert("Error");
         }      
    });
}


