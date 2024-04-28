"use strict";

$(document).ready(function () {
    document.addEventListener("touchstart", function () { }, true);
    //enable bootstrap popover
    var popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    $(function () {
        $("[data-toggle=popover]").popover({
            html: true,
            content: function () {
                var content = $(this).attr("data-popover-content");
                return $(content).children(".popover-body").html();
            },
        });
    });

    //initialize canvas conffetti
    confetti.create(myCanvas, { resize: true });

    //format display based on random color
    const targetcolor = "538d4e";
    // const titleColor = "5F925A"
    // const borderColor = "5F925A"

    $("#color").css("background-color", "#" + "495c75");
    $(":root").css("--lg", `#${targetcolor}40`);
    $(":root").css("--border", `#${targetcolor}ee`);
    $(":root").css("--green", `#${targetcolor}`);

    //generate grid
    //create rows
    const allowedtries = 6;
    for (let i = 0; i < allowedtries; i++) {
        //number of rows determined by number of tries allowed
        $("#guesses").append(
            `<div id="gcont${i}"class="mx-auto gboxcontainer"><div id="g${i}" class="row m-auto my-1"></div></div>`
        );
    }

    //create columns
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 5; c++) {
            $("#g" + r).append(
                `<div id="gbox${r}${c}" class="col-2 mx-1 p-0 gbox"><h2 id="gtext${r}${c}" class="m-auto p-0"></h2></div>`
            );
        }
    }

    //generate keyboard
    const kb1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const kb2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const kb3 = ["Z", "X", "C", "V", "B", "N", "M"]; // Changed from kb2 to kb3 for the third row

    for (const i in kb1) {
        $("#kb1").append(
            `<button type="button" id="b${kb1[i]}" class="col mx-1 p-0 kbkey"><h6 class="m-auto">${kb1[i]}</h6></button>`
        );
    }

    for (const i in kb2) {
        $("#kb2").append(
            `<button type="button" id="b${kb2[i]}" class="col mx-1 p-0 kbkey"><h6 class="m-auto">${kb2[i]}</h6></button>`
        );
    }

    for (const i in kb3) {
        $("#kb3").append(
            `<button type="button" id="b${kb3[i]}" class="col mx-1 p-0 kbkey"><h6 class="m-auto">${kb3[i]}</h6></button>`
        );
    }

    //initialize game variables
    let game = true;
    let guess = [];
    let result = ["", "", "", "", "", ""];
    let finalResult = ["", "", "", "", "", ""];

    //right spot
    let green = [];

    //in the code but wrong spot
    let yellow = [];

    //not in the code
    let gray = [];

    let currow = 0; // attempt number
    let currcol = 0; // letter input

    //when a keyboard key is clicked
    $(".kbkey").click(function () {
        $("#del").prop("disabled", false);

        if (guess.length < 5) {
            const l = $(this).text().trim();
            guess.push(l);
            $("#gbox" + currow + "" + currcol).addClass("shake");
            $("#gtext" + currow + "" + currcol).text(l);
            currcol++;
        }

        if (guess.length === 5) {
            $("#enter").prop("disabled", false);
            $(".kbkey").prop("disabled", true);
        }
    });

    //when delete is clicked
    $("#del").click(function () {
        $("#enter").prop("disabled", true);
        if (guess.length > 0) {
            guess.pop();
            currcol--;
            $("#gtext" + currow + "" + currcol).text("");
            $("#gbox" + currow + "" + currcol).removeClass("shake");
        }

        if (guess.length === 0) {
            $(this).prop("disabled", true);
        }

        if (guess.length < 5) {
            $(".kbkey").prop("disabled", false);
        }
    });

    // Array of words
    const words = [ "HORSE","RIVER","BREAD","TRAIN","HOUSE","PLANT","WATER","STORM","CHAIR","LIGHT","SMILE","FRAME","STONE","GLASS","CRASH","GRASS","SHELF","MOUSE","PIANO","ALARM","SUGAR","THROW","NORTH","FLOOR","MONEY","BEACH","APPLE","CROWD","CHIEF","SALAD","SNAKE","LEMON","STEAM","SHEEP","SHARK","TIGER","BENCH","BERRY","BLOCK","MATCH","FLUTE","COACH","PIZZA","COAST","WORLD","HEART","TRICK","DANCE","WHITE","BLACK","HAPPY","PROUD","WATCH","DRIVE","BRICK","BRUSH","BLADE","BLAST","CLEAN","DREAM","PRICE","YOUTH","SPICE","SPOON","PHOTO","PAINT","RADIO","HONEY","PILOT","TABLE","DRESS","JUICE","SWING","FRUIT","CHESS","TRUCK","TOOTH","PARTY","SOUND","DRINK","GRAPE","BREAD","STAGE","SPACE","GRACE","SNAKE","MOOSE","JOKER","BLOOM","PLATE","ROBOT","INDEX","LEVER","CRISP","STAIR","CREAM","LASER","UNCLE","SALTY","DELTA","SPIKE","SCALE","GRANT","WHOLE","VIRUS","JELLY","PANDA","CLOTH","FIELD","HARSH","SUNNY","CREPE","WITCH","SPARK","DRAFT","PRIZE","OPERA","MANGO","LUCKY","RADAR","CHART","BROWN","RUSTY","SOLID","MERCY","FORCE","PEARL","ROYAL","MARCH","GUESS","TULIP","KNIFE","COBRA","RALLY","SQUAD","RAINY","NOBLE","RIDER","MIXER","DRIER","QUERY","GENRE","SHAPE","EXTRA","SCENE","LOBBY","TASTE","DOUGH","CLOVE","DODGE","OFFER","CRIME","TOAST","FLAME","STAMP","SLEEP","AROMA","LUNCH","QUICK","PIECE","FAULT","DONUT","FLOOD","BEGIN","CLEAN","STORM","PAPER","DIZZY","RANCH","GUEST","WRECK","FRAME","SWEAT","MOTOR","PULSE","FLYER","PITCH","CHILL","PRIME","GUARD","TWIST","STAIN","MODEL","BREAK","BERRY","CROWN","BRASS","WEIGH","ANGRY","OCEAN","CLIFF","SMOKE","GRAIN","BEAST","WHISK","SCARY","DRAMA","SNAKE","POKER","SPILL","CHASE","GLORY","RADIO","OLIVE","CHAMP","CIVIL","FORGE","COMET","FENCE","BAKER","BRAND","SPENT","MEDAL","CHAOS","DEPOT","SHINY","DIVER","BLAST","HUMOR","SLOPE","TRIPE","BASIN","CORAL","COACH","RULER","SCALE","FRANK","CLASH","GLASS","LOSER","STAFF","HOUND","CRAZY","GLOVE","BLAZE","CLICK","LYRIC","SCRUB","MONEY","CAMEL","AWARD","WATCH","SHINE","BEACH","FIGHT","VIDEO","SHAPE","SENSE","PLUMB","PATCH","LEASH","DRIVE","QUILT","CRAFT","BADGE","COMIC","STARE","SYRUP","SHADE","PRANK","PHONE","STAGE","LAYER","GLIDE","CYCLE","EAGLE","RINSE","CARGO","FEAST","WOUND","SMITH","CLOUD","GHOST","ALERT","TRASH","FLESH","SPARE","TOOTH","CORER","NYLON","CORER","ALONE","GRIPE","CIGAR","STOUT","GOOSE","SHARE","CLUMP","TRUNK","LOBBY","TWEET","TWICE","USHER","ERROR","ALONG","BLANK","SOBER","CRISP","BRING","BLIND","GRIND","PULSE","BLOOM","GOLEM","LUNCH","SPORT","FLOCK","SLATE","SCORE","POUND","THROW","SKIRT","FLOUR","PANIC","SPARK","LAUGH","LIGHT","CABIN","INLET","CHILD","SHORE","CRUST","SALTY","JELLY","BLUSH","FLUID","HATCH","CLICK","TONGU","HOVER","CHUNK","BREAD","CHIEF","SQUID","BREED","CHALK","BRACE","AISLE","SPRAY","LEVEL","CLASP","BLEND","BOOTH","TOPIC","CLOCK","STACK","RIVER","BISON","EQUAL","SQUAT","GREET","MIGHT","PRINT","FROST","SUGAR","BENCH","SNAIL","CRANE","BOOST","SAUCE","PLANT","AMONG","FLOCK","SPICE","ALIVE","TIGER","TABLE","WHEEL","PATCH","STORM","UNITE","MARCH","TRAIL","CHIME","BRICK","FRUIT","CATER","SPOON","ARGUE","FLUTE","SPILL","GUARD","FRONT","SLOPE","AGREE","FUNNY","STOCK","CIVIC","BENCH","ORBIT","PLATE","INDEX","SHEAR","PLAIN","STACK","SMOKE","HORSE","MONEY","SCRAP","SPARK","SLOSH","SCALE","ANGLE","FERRY","DROOP","SPIKE","PENNY","GLOBE","SMART","BARGE","CRACK","UNIFY","DEMON","ROUND","WHIRL","SCRUB","SWING","POINT","SPENT","CRUEL","START","SLASH","TOPAZ","STUMP","SNOUT","WHERE","JUICE","NOVEL","SWORD","DRAFT","SHELF","TREAT","GRAVY","PRIDE","TOWEL","SWEET","MAIZE","REACT","WITCH","TWEED","GUILT","GROOM","CURVE","POUCH","DRESS","SPILL","LIVER","FRAME","WRONG","PILOT","TREND","CHEST","BLURB","SURGE","FRANK","CHOKE","COVER","TRIAL","REBEL","FLUSH","ORGAN","JUDGE","CRISP","SPITE","LEMON","MOUSE","BLOWN","STOVE","THUMB","INFER","FOCAL","BRIEF","FLYER","SHIRT","PLANK","GROVE","STEAM","PURSE","POKER","CRASH","GRIND","TWIRL","TRUCE","COUNT","LARGE","PRIZE","APPLE","SPEAK","TITHE","BLINK","SLIDE","GRASP","SHARP","SURGE","BRISK","SPIRE","SLANT","SQUIB","FLIRT","TUMOR","CURLY","PROOF","GRIPE","THORN","CLEAN","USUAL","CRATE","FOLLY","BLIMP","PAUSE","CHILL","CHEER","BLISS","STALE","TREND","HOBBY","RIGHT","THANK","LEARN","BREAD","TEASE","CRAZE","ABOVE","SCRAP","CLEAN","SPEND","FUNGI","BROWN","SPOOK","SNAKE","REIGN","YIELD","BLOKE","FAITH","SHADE","DRINK","FLOOR","STOCK","MOIST","DOCKS","WRIST","TRICK","JELLY","SWEAR","GLOOM","TRAIT","OFFER","WHINE","FROST","CURVE","CHAOS","SMALL","GROUP","FLICK","STOVE","CRISP","KNEEL","CHAIR","HEART","SLICE","BLEEP","SHOCK","STAGE","FLUFF","HOARD","GLASS","PATCH","BLAME","FLASH","CRUSH","TRUCK","FLUSH","FLUKE","BELLY","STORM","WRONG","SHARK","SPICE","BROOM","WOMAN","SCOUT","SQUAT","RHYME","MODEL","VIGOR","SLUMP","PUNCH","DEMON","CRUEL","PITCH","FORCE","ALOFT","FOUND","SCARF","STORM","LOOSE","HEAVE","STALK","LOWER","FIGHT","BLEED","PRIME","BLACK","SOOTH","POUND","CLASH","MOULD","GUILT","CHOIR","LOFTY","SUGAR","SCOPE","FLARE","CHURN","MOTOR","PRESS","GRAVE","CREST","SPEAR","CREEK","SLACK","LUSTY","CHUMP","NERVE","SLEEK","FLOCK","BREAD","DREAM","CRAMP","LUNCH","SPILL","FLASH","CLOSE","LEAVE","BLINK","SLIDE","START","CHEAT","PLUMB","LIGHT","RIVER","CRASH","GLORY","SHAKE","STRAW","CURLY","CRUSH","WATCH","STORM","SOLVE","SPONG","DOCKS","FRANK","SPEND","GUESS","TASTE","PHASE","SPEAR","CLEAN","SWAMP","CHILL","TEACH","SWEET","CLOVE","BENCH","CLASS","BRIEF","FIELD","PIZZA","ANGEL","SHINE","OASIS","SLICE","SOUND","BLEND","STINK","SEWER","BLINK","STUMP","TRAMP","FRESH","MARCH","ALARM","LIVER","PENNY","SMILE","TRUST","PROUD","STAFF","FRUIT","GUARD","BRAND","SWIFT","PATCH","TRUCK","BRUSH","CHART","STAND","MOIST","STAGE","BATCH","PLUMB","BLEND","BRIEF","PUNCH","LIGHT","YIELD","SPOKE","SNAKE","STING","FRESH","STAIR","STORM","BERRY","STORM","BELLY","FLESH","GRAVE","GLASS","CHALK","SHADE","DOZEN","GLOBE","CATCH","CLAMP","CHAMP","STRIP","SPITE","GRIND","BLUSH","THINK","SPOUT","PRICK","BLANK","CHALK","STUCK","WHIFF","GLARE","STALK","SLANT","GROVE","SHINE","LURCH","GLOVE","CRUST","GRACE","MOOSE","LIGHT","STACK","CRAVE","SNEAK","CLASS","CREST","STAFF","BRAND","STAND","STALK","STAIR","SMELL","STORM","STAFF","CROWD","FRESH","SLANT","BLAST","STIFF","STILL","STOMP","SWIFT","SCRAP","SNIFF","SMASH","SWING","CHURN","STRAP","CLOTH","CRASH","SPLAT","SMASH","SHEEP","SHRUB","SLANT","SPOON","SLASH","SCOUT","STEAM","STAKE","STAMP","SCARF","SPADE","SPOON","SCREW","SNIPE","STALE","SPILL","STAKE","SWEAR","SPARK","STIFF","SHOUT","SHAKE","SNAKE","SLOPE","SHAVE","STOMP","STAND","SWELL","SMALL","STINT","SWIRL","STACK","STORY","SHADE","STORM","SQUAT","STEAK","SKILL","STOVE","STARE","STRIP","SLEEP","STOUT","STING","STAKE","SWING","SWIRL","SPELT","STAND","SPAWN","SHAVE","STRAW","STAND","SMALL","SLASH","SIGHT","SCOFF","SHOVE","SWAMP","SLOTH","STINK","SCARE","SPEND","STINT","SWING","SLATE","STIFF","SWILL","SPARE","STUFF","SHOUT","STUFF","SPRAY","STEAM","STINT","STAFF","SWIFT","SCARE","SPRAY","SWIFT","STIFF","SMOKE","SWILL","SHAME","SHOUT","STILL","SNAKE","STUCK","STAIN","STRIP","SHRUB","SHINE","SCREW","SHOAL","SHINE","SMALL","SHOVE","STRAW","SHIRT","SWEET","SCOFF","SHRUB","SMOKE","SQUID","STINK","SLEEP","SHADE","SLASH","SHRUB","SLANT","SMASH","STINT","SLASH","STING","SWELL","SCREW","STUFF","SHEEP","SHEEP","SHADE","SHADE","SHAVE","STAIN","SHOVE","SHRUB","SMOKE","SHINE","SMELL","STALE","SHRUB","SHINE","SCOFF","SMALL","SQUID","SQUID","SQUID","SCARE","SHADE","STAKE","STAFF","STEAM","STAFF","STEAM","STIFF","SMELL","SHELF","SWIRL","SHAKE","SPAWN","SPRAY","SMALL","SWEET","SHOCK","STUCK","SPENT","SMALL","SPAWN","SHOUT","STAFF","SQUID","SPRAY","SMELL","STIFF","SPRAY","SHAVE","SLEEP","SWIRL","STUCK","SWEET","STAKE","STALE","SHOUT","SPRAY","SPENT","SQUAD","SWIRL","SHADE","SWING","STUCK","STUFF","SPRAY","STUFF","SHIFT","SWEEP","SHEET","SPLIT","STEEL","STEEP","STEAL","STICK"]
    // Function to get a random word and convert it to an array of characters
    function getRandomWordAsArray(words) {
        const randomIndex = Math.floor(Math.random() * words.length); // get a random index
        return words[randomIndex].split(""); // split the word into an array of characters
    }

    // Existing array
    const targetArr = [];

    // Assign a random word to targetArr
    targetArr.length = 0; // Clear the existing array
    targetArr.push(...getRandomWordAsArray(words)); // Push the characters of the random word

    console.log(targetArr); // Output the new targetArr

    //when enter is clicked, evaluate results
    $("#enter").click(function () {
        $("#enter").prop("disabled", true);
        $("#color").css("background-color", "#" + guess.join(""));
        $("#color").css("color", "#" + targetcolor);
        // show results
        // find exact matches
        // const targetArr = ['C', 'R', 'A', 'N', 'E']
        console.log(guess)
        console.log(result)
        console.log(targetArr)
        console.log(guess)
        for (let i = 0; i < 5; i++) {
            if (guess[i] == targetArr[i]) {
                result[i] = "green";
                // $('#gbox' + currow + '' + i).css('background', 'green')
                green.push(targetArr[i]);
                // $('#b' + targetArr[i]).css('background', 'green');
                // targetArr[i] = "g"; //block green guess from being recounted
                finalResult[i] = "g"
                guess[i] = "y";
            }
        }
        //find matches within target but in in correct location
        // for letter in target
        for (let i = 0; i < 5; i++) {
            if (targetArr[i] != "x") {
                let tl = targetArr[i];
                // for letter in guess
                for (let j = 0; j < 5; j++) {
                    if (guess[j] == tl) {
                        result[j] = "yellow";
                        // $('#gbox' + currow + '' + j).css('background', 'yellow');
                        yellow.push(targetArr[i]);
                        // targetArr[i] = "x"; // prevent recounts
                        guess[j] = "y";
                        break;
                    } else if (guess[j] != "y") {
                        result[j] = "gray";
                        gray.push(guess[j]);
                    }
                }
            }
        }

        //at the end of every round
        currcol = 0;
        guess = [];

        //show result of guess
        var tilesArray = [
            $("#gbox" + currow + "" + 0),
            $("#gbox" + currow + "" + 1),
            $("#gbox" + currow + "" + 2),
            $("#gbox" + currow + "" + 3),
            $("#gbox" + currow + "" + 4),
        ];
        tilesArray.map(function (tile, i) {
            tile.addClass("flip");
            tile.css("animation-delay", `${i * 300}ms`);
            setTimeout(() => {
                tile.addClass(result[i]);
            }, i * 300);
        });

        //after results are displayed
        setTimeout(() => {
            //change the color of keyboard
            gray.forEach((word, i) => {
                $("#b" + gray[i]).addClass("gray");
            });
            yellow.forEach((word, i) => {
                $("#b" + yellow[i]).addClass("yellow");
            });
            green.forEach((word, i) => {
                $("#b" + green[i]).addClass("green");
            });

            //if answer is completely right
            console.log(targetArr)
            if (finalResult.join("") == "ggggg") {
                $("#color").css("color", "white");
                confetti();
                if (currow == 0) {
                    $("#alert").html("Woah! You guessed word on your first try!");
                } else {
                    $("#alert").html(`You solved the Word Quest in ${currow + 1} tries!`);
                }
                game = false;

                //if player loses the game
            } else if (currow + 1 === allowedtries) {
                $("#alert").append(
                    `The word was ${targetArr.join('')}. Better luck next time!`
                );
                game = false;
            } else {
                currow++;
                $(".kbkey").prop("disabled", false);
            }

            //at the end of game, disable buttons and free memory
            if (game == false) {
                $(".kbkey").prop("disabled", true);
                $("#enter").prop("disabled", true);
                $("#del").prop("disabled", true);
                green = [];
                yellow = [];
                gray = [];
                currow = 0;
                currcol = 0;
            }
        }, 2400);
    });
});
