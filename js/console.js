const defaultReplies = ["Hmmmm...", "Hello", "Try help", "I wonder what this does?"];

document.addEventListener("keydown", async (event) => {
    if (event.key != '`') {
        return null
    }
    var inputVal = prompt();

    if (inputVal.split(" ")[0] == "cowsay") {
        var msg = inputVal.substring(7);
        alert(`
  ${'_'.repeat(msg.length)}
< ${inputVal.substring(7)} >
  ${'-'.repeat(msg.length)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`);
    }


    switch (inputVal) {
        case 'hello':
            alert("Hi!");
            break;
        case 'help':
            alert("Try ls, random or if your really brave....scary.");
            break;
        case 'ls':
            open("/navigationMapping.json");
            break;
        case 'ping':
            alert("Pong");
            break;
        case 'splish':
            alert("Splash");
            break;
        case 'splash':
            alert("No splish goes first not splash!")
            break;
        case 'scary':
            alert("Boo!")
            break;
        case '739':
            alert("Do I look like a mouthwash freighter spaceship??");
            break;
        case 'random':
            var splashText = (await loadJson("splash.json"))["splash"];
            alert(splashText[Math.floor(Math.random()*splashText.length)]);
            while (confirm("Another?")) {alert(splashText[Math.floor(Math.random()*splashText.length)]);}
            break;
        default:
            alert(defaultReplies[Math.floor(Math.random()*defaultReplies.length)]);
            break;
    }



});