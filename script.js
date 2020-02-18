$("body").on("keydown", (e) =>{
    
    for(var i = 0; i < keyBoard.length; i++)
    {
         if(e.keyCode == keyBoard[i])
         {
             keyBoardDown(keyBoardNotes[i]);
         }
     }
});
    

var synth = new Tone.Synth( {
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
var dist = new Tone.Distortion({
    distortion: 10000,
    oversample: "2x"
});



var delay = new Tone.FeedbackDelay(
    {
        delayTime : 0.75 ,
        maxDelay : 5
        }      
);



var reverb = new Tone.Reverb( {
    decay : 50 ,
    preDelay : 0.01
    })

    var keyBoard = [81, 50, 87, 51, 69, 82 ,53, 84, 54, 89, 55, 85,
                    90, 83, 88, 68, 67, 86, 71, 66, 72, 78, 74, 77];
    var notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    var keyBoardNotes = new Array();
    var octaveCounter = 0;
    var html = "";
    var j = 0;
/*-----------------Start Up-------------------- */
for(octave = 0; octave < 2; octave++){
    for(var i = 0; i < notes.length; i++){
        var hasSharp = true;
        var note = notes[i];

    if(note == 'E'|| note =='B'){
        hasSharp = false;
    }
        html +=`<div class ='whitenote' onmousedown='noteDown(this)' 
        data-note='${note + (octave+4)}'>`;
        keyBoardNotes[j] = note + (octave+4);
        j++;
        if(hasSharp == true){
        html +=`<div class ='blacknote' onmousedown='noteDown(this)'
        data-note='${note + '#' + (octave+4)}'></div>`;
        keyBoardNotes[j] = note + '#' + (octave+4);
        j++;
        }
        html += '</div>';
    }
}

document.getElementById("keys").innerHTML += html;
console.log(html);

/*--------------Effect control----------- */

$("#dist-btn").click(() => {
    synth.connect(dist);
    dist.toMaster();
});

$("#reverb-btn").click(() => {
    synth.connect(reverb);
    reverb.toMaster();
});
$("#delay-btn").click(() => {
    synth.connect(delay);
    delay.toMaster();
})
    
/*--------------------------Control panel----------------------*/

/*--------Osc buttons-------------*/
/*-----Triganle btn-------- */
$("#triangle-btn").click(() =>{
    $("#triangle-btn").addClass("osc-btn-checked");
        $("#triangle").css("visibility", "visible");
    
    $("#square-btn").removeClass("osc-btn-checked");
        $("#square").css("visibility", "hidden");
            
    $("#sine-btn").removeClass("osc-btn-checked");
        $("#sine").css("visibility", "hidden");
    
    $("#sawtooth-btn").removeClass("osc-btn-checked");
        $("#sawtooth").css("visibility", "hidden");
    
    synth.oscillator.type = "triangle";
});
/*--------Square btn----------- */
$("#square-btn").click(() => {
    $("#square-btn").addClass("osc-btn-checked");
        $("#square").css("visibility", "visible");
    
    $("#triangle-btn").removeClass("osc-btn-checked");
        $("#triangle").css("visibility", "hidden");
    
    $("#sine-btn").removeClass("osc-btn-checked");
        $("#sine").css("visibility", "hidden");
    
    $("#sawtooth-btn").removeClass("osc-btn-checked");
        $("#sawtooth").css("visibility", "hidden");
    synth.oscillator.type ="square";
});
/*---------------Sine btn------------------*/
$("#sine-btn").click(() => {
    $("#sine-btn").addClass("osc-btn-checked");
        $("#sine").css("visibility", "visible");   
    
    $("#triangle-btn").removeClass("osc-btn-checked");
        $("#triangle").css("visibility", "hidden");
    
    $("#square-btn").removeClass("osc-btn-checked");
            $("#square").css("visibility", "hidden");

    $("#sawtooth-btn").removeClass("osc-btn-checked");
        $("#sawtooth").css("visibility", "hidden");
    synth.oscillator.type ="sine";
});
/**------------Sawtooth btn---------------------- */
$("#sawtooth-btn").click(() => {
    $("#sawtooth-btn").addClass("osc-btn-checked");
        $("#sawtooth").css("visibility", "visible");    
    
    $("#triangle-btn").removeClass("osc-btn-checked");
        $("#triangle").css("visibility", "hidden");       
    
    $("#square-btn").removeClass("osc-btn-checked");
        $("#square").css("visibility", "hidden");           
    
    $("#sine-btn").removeClass("osc-btn-checked");
        $("#sine").css("visibility", "hidden");
    synth.oscillator.type ="sawtooth";
});

/*---------------Modify controll------------------ */
$("#attack-slide").on('input',() => {
    var aCounter = $("#attack-slide").val();
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
    var dCounter = $("#decay-slide").val();
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
    var sCounter = $("#sustain-slide").val();
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
    var rCounter = $("#release-slide").val();
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
    $("#keys").html('');
    
    keyBoardNotes = new Array();
    j = 0;
    var html = "";
    octaveCounter++;
    if(octaveCounter > 4)
    {
        octaveCounter = 4;
    }
    for(octave = octaveCounter; octave < 2 + octaveCounter; octave++){
        for(var i = 0; i < notes.length; i++){
            var hasSharp = true;
            var note = notes[i];

        if(note == 'E'|| note =='B'){
            hasSharp = false;
        }
            html +=`<div class ='whitenote' onmousedown='noteDown(this)' 
            data-note='${note + (octave+4)}'>`;
            keyBoardNotes[j] = note + (octave+4);
            j++;
            if(hasSharp == true){
            html +=`<div class ='blacknote' onmousedown='noteDown(this)'
            data-note='${note + '#' + (octave+4)}'></div>`;
            keyBoardNotes[j] = note + '#' + (octave+4);
            j++;
            }
            html += '</div>';
        }
    }
    document.getElementById("keys").innerHTML += html;    
})

$("#oct-down").click(() => {
    $("#keys").html('');
    keyBoardNotes = new Array();
    j = 0;
    var html = "";
    octaveCounter--;
    if(octaveCounter < -5)
    {
        octaveCounter = -5;
    }
    for(octave = octaveCounter; octave < 2 + octaveCounter; octave++){
        for(var i = 0; i < notes.length; i++){
            var hasSharp = true;
            var note = notes[i];

        if(note == 'E'|| note =='B'){
            hasSharp = false;
        }
            html +=`<div class ='whitenote' onmousedown='noteDown(this)' 
            data-note='${note + (octave+4)}'>`;
            keyBoardNotes[j] = note + (octave+4);
            j++;
            if(hasSharp == true){
            html +=`<div class ='blacknote' onmousedown='noteDown(this)'
            data-note='${note + '#' + (octave+4)}'></div>`;
            keyBoardNotes[j] = note + '#' + (octave+4);
            j++;
            }
            html += '</div>';
        }
    }
    document.getElementById("keys").innerHTML += html;
       
})
/*-------------------------------------------------------------------- */


function noteDown(elem) {
    var note = elem.dataset.note;
    synth.triggerAttackRelease(note, "8n");
    event.stopPropagation();

}

function keyBoardDown(note){
    synth.triggerAttackRelease(note, "8n");
    event.stopPropagation();
}
