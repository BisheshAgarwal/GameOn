$(document).ready(function(){
    $(".js--genre-1").click(function(){
        
        $(".js--genre-1").addClass("active");
        $(".js--genre-2").removeClass("active");
        $(".js--genre-3").removeClass("active");
        $(".js--genre-4").removeClass("active");
        
        $(".action").addClass("animated fadeIn");
        $(".action").css("display", "block");
        $(".sports").css("display", "none");
        $(".multiplayer").css("display", "none");
        $(".additional").css("display", "none");
    });
    
    $(".js--genre-2").click(function(){
        
        $(".js--genre-2").addClass("active");
        $(".js--genre-1").removeClass("active");
        $(".js--genre-3").removeClass("active");
        $(".js--genre-4").removeClass("active");
        
        $(".sports").addClass("animated fadeIn");
        $(".sports").css("display", "block");
        $(".action").css("display", "none");
        $(".multiplayer").css("display", "none");
        $(".additional").css("display", "none");
    });
    
    $(".js--genre-3").click(function(){
        
        $(".js--genre-3").addClass("active");
        $(".js--genre-1").removeClass("active");
        $(".js--genre-2").removeClass("active");
        $(".js--genre-4").removeClass("active");
        
        $(".multiplayer").addClass("animated fadeIn");
        $(".multiplayer").css("display", "block");
        $(".action").css("display", "none");
        $(".sports").css("display", "none");
        $(".additional").css("display", "none");
    });
    
    $(".js--genre-4").click(function(){
        
        $(".js--genre-4").addClass("active");
        $(".js--genre-1").removeClass("active");
        $(".js--genre-2").removeClass("active");
        $(".js--genre-3").removeClass("active");
        
        $(".additional").addClass("animated fadeIn");
        $(".additional").css("display", "block");
        $(".action").css("display", "none");
        $(".sports").css("display", "none");
        $(".multiplayer").css("display", "none");
    });
});