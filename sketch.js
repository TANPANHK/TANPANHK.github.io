let mouse_X = [];
let mouse_Y = [];
let point_x_n = [];
let point_y_n = [];

let a, b;

const learningRate = 0.1;
let optimizer;


function setup(){
    createCanvas(640, 480);
    background('black');

    a = tf.scalar(Math.random()).variable();
    b = tf.scalar(Math.random()).variable();

    optimizer = tf.train.sgd(learningRate)
}

function draw(){


    background('black');

    if(mouse_X.length > 0){

        tf.tidy(() => {
            const tensor_x = tf.tensor1d(point_x_n);
            const tensor_y = tf.tensor1d(point_y_n);
    
            optimizer.minimize(() => loss(f(tensor_x), tensor_y));

        });

        for(let i = 0; i < mouse_X.length; i++){
            stroke(255);
            strokeWeight(5);
            point(mouse_X[i], mouse_Y[i]);
        }
        
    }
    stroke(255);
    let x1, y1, x2, y2;
    x1 = 0;
    x2 = 1;
    tf.tidy(() => {
        y1 = f(x1).dataSync()[0];
        y2 = f(x2).dataSync()[0];

    });

    x1 = map(x1, 0, 1, 0, width);
    x2 = map(x2, 0, 1, 0, width);
    y1 = map(y1, 0, 1, height, 0);
    y2 = map(y2, 0, 1, height, 0);
    
    //console.log(x1, y1, x2, y2);
    line(x1, y1, x2, y2);

    
   
}

const f = x => a.mul(x).add(b);
const loss = (pred, label) => pred.sub(label).square().mean();


function mouseClicked(){

    if(mouseX <= width && mouseY <= height)
    {
        mouse_X.push(mouseX);
        mouse_Y.push(mouseY);
        point_x_n.push(map(mouseX, 0, width, 0, 1));
        point_y_n.push(map(mouseY, 0, height, 1, 0));
        
    }
    // stroke(255);
    // strokeWeight(5);
    // point(mouseX, mouseY);
    
}

function mouseReleased(){
    
}

function mousePressed(){
    

}

