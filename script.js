let keytest;
$("body").on("keydown", (e) =>{
    
    for(let i = 0; i < keyBoard.length; i++)
    { 
         if(e.keyCode == keyBoard[i])
         {
             keyBoardDown(keyBoardNotes[i]);
             keytest = $(`#key${i}`).addClass("noteclick");
             
             setTimeout(function (){
                keytest.removeClass("noteclick")
             }, 120);
         }
     }
});

//************Synth*************** */


let synth = new Tone.Synth( {
    oscillator : {
    type : "triangle"
    }
    ,
    envelope : {
    attack : 0.1 ,
    decay : 0.1 ,
    sustain : 0.3 ,
    release : 1
    }
    }).toMaster();


    
//*************************************** */
//*************Overdrive effect********* */
let dist = new Tone.Distortion({
    distortion: 0.3,
    oversample: "none"
});
let distswicth = false;
$("#oversample").on('input', () => {
    let overSample = $("#oversample").val();
    if(overSample < 1){
        dist.oversample = "none";
    }
    else{
        dist.oversample = (overSample * 2) + "x";
    }

});

$("#distortion").on('input', () =>{
    dist.distortion = $("#distortion").val() / 10;
})


//********************************** */
//************Delay effect******* */
let delay = new Tone.FeedbackDelay(
    {
        delayTime : 1,
        maxDelay : 5
        }      
);
let delaySwicth = false;

$("#delaytime").on('input', () =>{
    delay.delayTime = $("#delaytime").val();
    
});
$("#maxdelaytime").on('input', () =>{
    delay.maxDelay = $("#maxdelaytime").val();
})
//******************************* */


//************Reverb effect */
let reverb = new Tone.Reverb( {
    decay : 5,
    preDelay : 0.10
    })
let reverbSwicth = false;

$("#decay").on('input', () => {
    reverb.decay = $("#decay").val();
})

$("#predelay").on('inut', () =>{
    reverb.preDelay = $("predelay").val() * 0.10;
})
//**************************** */


    const keyBoard = [81, 50, 87, 51, 69, 82 ,53, 84, 54, 89, 55, 85,
                        90, 83, 88, 68, 67, 86, 71, 66, 72, 78, 74, 77];
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    let keyBoardNotes = new Array();
    let octaveCounter = 0;
    let html = "";
    let j = 0;
    let keyCounter = 0;

    function startUp() {
    
    for(octave = 0; octave < 2; octave++){
        for(let i = 0; i < notes.length; i++){
        let hasSharp = true;
        let note = notes[i];

        if(note == 'E'|| note =='B'){
            hasSharp = false;
        }
        html +=`<div class ='whitenote' id="key${j}" onmousedown='noteDown(this)' 
        data-note='${note + (octave+4)}'>`;
        keyBoardNotes[j] = note + (octave+4);
        j++;
        keyCounter++;
        if(hasSharp == true){
        html +=`<div class ='blacknote' id="key${j}" onmousedown='noteDown(this)'
        data-note='${note + '#' + (octave+4)}'></div>`;
        keyBoardNotes[j] = note + '#' + (octave+4);
        j++;
        keyCounter++;
        }
        html += '</div>';
        
        }
    }
    document.getElementById("keys").innerHTML += html;

            $("#attack-count").html("0" + $("#attack-slide").val());
            $("#decay-count").html("0" + $("#decay-slide").val());
            $("#sustain-count").html("0" + $("#sustain-slide").val());
            $("#release-count").html("0" + $("#release-slide").val());
            $("#octave-show").html(octaveCounter);
            $("#triangle-btn").addClass("osc-btn-checked");
    }


/*--------------Effect control----------- */



$("#dist-btn").click(() => {
    if(distswicth == false){
    synth.connect(dist);
    dist.toMaster();
    distswicth = true;
    $("#dist-btn").addClass("effect-button-clicked");
    }
    else{
        $("#dist-btn").removeClass("effect-button-clicked");
        dist.disconnect();
        distswicth =false;
    }
});

$("#reverb-btn").click(() => {
    if(reverbSwicth == false){
    synth.connect(reverb);
    reverb.toMaster();
    reverbSwicth = true;
    $("#reverb-btn").addClass("effect-button-clicked");
    }
    else{
        $("#reverb-btn").removeClass("effect-button-clicked");
    reverb.disconnect();
    reverbSwicth = false;
    }
});
$("#delay-btn").click(() => {
    if(delaySwicth == false){
    synth.connect(delay);
    delay.toMaster();
    delaySwicth = true;
    $("#delay-btn").addClass("effect-button-clicked")
    }
    else{
        delay.disconnect();
        delaySwicth = false;
        $("#delay-btn").removeClass("effect-button-clicked");
    }
})
    
/*--------------------------Oscillators----------------------*/
const oscTypes = ["triangle", "square", "sawtooth", "sine" ];
function oscillatorChange(e) {

    for(var i = 0; i < oscTypes.length; i++){   
        
        if(e === oscTypes[i] + "-btn"){
        $(`#${oscTypes[i] +"-btn"}`).addClass("osc-btn-checked");
        $(`#${oscTypes[i]}`).css("visibility", "visible");
        synth.oscillator.type = oscTypes[i];
        
        }
        else {
            
            $(`#${oscTypes[i] +"-btn"}`).removeClass("osc-btn-checked");
            $(`#${oscTypes[i]}`).css("visibility", "hidden");
            
        }    
    };   
}

/*---------------Modify controll------------------ */
$("#attack-slide").on('input',() => {
    let aCounter = $("#attack-slide").val();
        if(aCounter < 10)
        {
            $("#attack-count").html(`0${aCounter}`);
        }
        else{
            $("#attack-count").html(aCounter);
        }
    synth.envelope.attack = $("#attack-slide").val() / 10;
});
$("#decay-slide").on('input',() => {
    let dCounter = $("#decay-slide").val();
        if(dCounter < 10)
        {
            $("#decay-count").html(`0${dCounter}`);
        }
        else{
            $("#decay-count").html(dCounter);
        }
    synth.envelope.decay = $("#decay-slide").val() / 10;
});
$("#sustain-slide").on('input',() => {
    let sCounter = $("#sustain-slide").val();
        if(sCounter < 10)
        {
            $("#sustain-count").html(`0${sCounter}`);
        }
        else{
            $("#sustain-count").html(sCounter);
        }
    synth.envelope.sustain = $("#sustain-slide").val() / 10;
});
$("#release-slide").on('input',() => {
    let rCounter = $("#release-slide").val();
        if(rCounter < 10)
        {
            $("#release-count").html(`0${rCounter}`);
        }
        else{
            $("#release-count").html(rCounter);
        }
        synth.envelope.release = $("#release-slide").val();
    });
    
   
    
/*-----------Octave change-------------*/
$("#oct-up").click(() => {
    octaveChange(2, 1);
})

$("#oct-down").click(() => {
       octaveChange(-2, -1);
})
function octaveChange(stopValue, step) {
    $("#keys").html('');
    keyBoardNotes = new Array();
    keyCounter = 0;
    j = 0;
    var html = "";
    octaveCounter += step;
    if(step < 0) {
        if(octaveCounter < stopValue)
        {
            octaveCounter = stopValue;
        }
    } else {
        if(octaveCounter > stopValue)
        {
            octaveCounter = stopValue;
        }
    }
    for(octave = octaveCounter; octave < 2 + octaveCounter; octave++){
        for(var i = 0; i < notes.length; i++){
            var hasSharp = true;
            var note = notes[i];

        if(note == 'E'|| note =='B'){
            hasSharp = false;
        }
            html +=`<div class ='whitenote' id="key${j}" onmousedown='noteDown(this)' 
            data-note='${note + (octave+4)}'>`;
            keyBoardNotes[j] = note + (octave+4);
            
            j++;
            if(hasSharp == true){
            html +=`<div class ='blacknote' id="key${j}" onmousedown='noteDown(this)'
            data-note='${note + '#' + (octave+4)}'></div>`;
            keyBoardNotes[j] = note + '#' + (octave+4);
            j++;
            }
            html += '</div>';
        }
    }
    if(octaveCounter > 0){
        $("#octave-show").html(`+${octaveCounter}`);
    }
    else{
        $("#octave-show").html(octaveCounter);
    }
    document.getElementById("keys").innerHTML += html;

}
/*-------------------------------------------------------------------- */



function noteDown(elem) {
    var note = elem.dataset.note;
    synth.triggerAttackRelease(note, "8n");
    event.stopPropagation();
    elem.classList.add("noteclick");
        setTimeout(function (){
            elem.classList.remove("noteclick");
         }, 120);
    }


function keyBoardDown(note){
    synth.triggerAttackRelease(note, "8n");
    event.stopPropagation(); 
    
}
startUp();