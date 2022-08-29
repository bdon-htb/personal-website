function t(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}class e{isLeaf(){return null==this.children}has(t){return this.value===t}hasChild(t){return!this.isLeaf()&&this.children.has(t)}hasTemplates(){return null!=this.templates}getChild(t){return this.isLeaf()?null:this.children.get(t)}getChildren(){return this.isLeaf()?null:this.children.entries()}getTemplates(){return this.templates}insert(t){null==this.children&&(this.children=new Map),this.children.set(t.value,t)}addTemplate(t){this.hasTemplates()||(this.templates=[]),this.templates.push(t)}constructor(t){this.value=t,this.children=null,this.templates=null}}class s{hasChild(t){return this.children.has(t)}getChild(t){return this.children.get(t)}getChildren(){return this.children.entries()}addChild(t){this.children.set(t.value,t)}search(t){let e=0,s=!1,i=this.getChild(t[e]);if(null==i)return null;for(;!s&&e<t.length-1;)i.hasChild(t[e+1])?(i=i.getChild(t[e+1]),e++):s=!0;return i}insert(t,s){let i=0;this.hasChild(t[i])||this.addChild(new e(t[i]));let n=this.getChild(t[i]);for(;i<t.length-1;i++)n.hasChild(t[i+1])||n.insert(new e(t[i+1])),n=n.getChild(t[i+1]);s.forEach((t=>n.addTemplate(t)))}stringify(){return this._stringifyHelper(this.getChildren())}_stringifyHelper(t,e=0,s="-"){let i="";for(const[n,a]of t)i+=s.repeat(e)+`${n}\n`,a.isLeaf()||(i+=this._stringifyHelper(a.getChildren(),e+1,s));return i}constructor(){this.children=new Map}}class i{get(t){if(!t.endsWith(this.fileExtension))throw new Error(`url does not point to valid ALIZA file: ${this.fileExtension}`);return new Promise(((e,s)=>{let i=new XMLHttpRequest;i.overrideMimeType("text/xml"),i.open("GET",t),i.onload=()=>e(i),i.onerror=()=>s(i),i.send()}))}async load(t){const e=t=>{throw new Error(`Error while loading file: ${t}`)};return await this.get(t).then((t=>{if(t.status>=200&&t.status<300)return t.responseXML;e(t.statusText)})).catch((t=>e(t.statusText)))}tokenize(t){return(t=t.replace(/(?:\r\n|\r|\n|!|\.|\?|\*)/g,"").toUpperCase()).split(" ")}compile(t){let e=new s,i=t.firstChild;for(const t of i.children){let s=[],i=[];for(const e of t.children)"in"===e.tagName?s.push(this.tokenize(e.textContent)):"out"===e.tagName&&i.push(e.textContent);s.forEach((t=>e.insert(t,i)))}return e}async loadAndCompile(t){let e=await this.load(t);return this.compile(e)}process(t){}constructor(){t(this,"fileExtension",".alzml")}}function n(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function a(t){return t.length>0?t[n(0,t.length-1)]:null}class h{start(t=!1){this.running&&t||(this.interval=setInterval((()=>{this.next()}),this.delay),this.currentIndex=this.startIndex,this.running=!0)}stop(){null!=this.interval&&clearInterval(this.interval),this.running=!1,this.currentIndex=this.startIndex}next(){this.currentIndex++,this.currentIndex>=this.endIndex&&(this.loop||(this.stop(),null!=this.callback&&this.callback()),this.currentIndex=this.startIndex)}setIndex(t){-1===t&&(t=this.endIndex),t=Math.max(t,this.startIndex),t=Math.min(t,this.endIndex),this.currentIndex=t}getIndex(){return this.currentIndex}getLastIndex(){return this.endIndex}getAllFrames(){return this.frames}getFrame(t){return null==t?this.frames[this.currentIndex]:this.frames[t]}isRunning(){return this.running}setDelay(t){this.delay=t}setLoop(t){this.loop=t}constructor(t,e,s,i){this.delay=t,this.startIndex=0,this.endIndex=e.length,this.frames=e,this.loop=s,this.callback=i,this.interval=null,this.running=!1,this.currentIndex=this.startIndex}}class r{async init(){this.submitBtn=document.getElementById(this.submitBtnId),this.submitInput=document.getElementById(this.submitInputId),this.transcript=document.getElementById(this.transcriptId),this.alizaCanvas=document.getElementById(this.alizaCanvasId),this.alizaSpeech=document.getElementById(this.alizaSpeechId),this.btnHandler,this.textHandler=t=>{"Enter"===t.code&&(t.preventDefault(),this.submitBtn.click())},this.alizaCanvas.width=this.alizaAssetWidth,this.alizaCanvas.height=this.alizaAssetHeight,this.alizaAssets=new Map,await this.loadAlizaAssets(),this.blinkAnimation=new h(41.7,[1,2,3,2,1],!1,(()=>{this.startBlink()})),this.talkAnimation=new h(41.7,[1,2,3,2,1],!0),this.startBlink(1e3),this.drawAliza(),window.addEventListener("resize",(()=>{this.updateSpeechBubbleSize()})),this.updateSpeechBubbleSize(),this.speechBubbleAnimation=null}getInput(t=!0){let e=this.submitInput.value;return t&&this.clearInputField(),e}clearInputField(){this.submitInput.value=""}setSubmitHandler(t){this.removeSubmitHandler(),this.submitBtn.addEventListener("click",t),this.submitInput.addEventListener("keyup",this.textHandler),this.btnHandler=t}removeSubmitHandler(){this.btnHandler&&(this.submitBtn.removeEventListener("click",this.btnHandler),this.btnHandler=null,this.submitInput.removeEventListener("keyup",this.textHandler))}addToTranscript(t,e){let s=`<span class="transcript-element"><p class="transcript-speaker-name">${t}:</p><p class="transcript-speaker-text">${e}</p></span>`;this.transcript.insertAdjacentHTML("afterbegin",s)}async loadAlizaAssets(){let t,e,s=this.alizaAssetWidth,i=this.alizaAssetHeight;for(const n of this.alizaAssetNames)e=this.alizaAssetsURL+"/"+n,t=await this.loadImage(e,s,i),this.alizaAssets.set(n,t)}loadImage(t,e,s){return new Promise(((i,n)=>{let a=new Image(e,s);a.onload=()=>i(a),a.onerror=n,a.src=t}))}drawAliza(){let t=this.alizaCanvas,e=[this.alizaAssets.get("body.png"),this.alizaAssets.get(`mouth${this.talkAnimation.getFrame()}.png`),this.alizaAssets.get(`eyes${this.blinkAnimation.getFrame()}.png`)],s=(Math.min(t.width/this.alizaAssetWidth,t.height/this.alizaAssetHeight),this.alizaCanvas.getContext("2d"));s.clearRect(0,0,t.width,t.height);for(let i of e)s.drawImage(i,0,0,i.width,i.height,0,0,t.width,t.height);this.updateSpeechBubbleText(),window.requestAnimationFrame((()=>{this.drawAliza()}))}startBlink(t){null==t&&(t=n(2e3,8e3)),setTimeout((()=>{this.blinkAnimation.start()}),t)}updateSpeechBubbleSize(){let t=this.alizaCanvas.getBoundingClientRect().height;this.alizaSpeech.setAttribute("style",`height: ${t}px`)}clearSpeechBubble(){this.alizaSpeech.innerHTML=""}updateSpeechBubbleText(){if(null!=this.speechBubbleAnimation){let t=this.speechBubbleAnimation.getAllFrames();t=t.slice(0,this.speechBubbleAnimation.getIndex()+1),this.alizaSpeech.innerHTML=t.join("")}}startSpeak(t){return new Promise(((e,s)=>{this.speaking=!0,null!=this.speechBubbleAnimation&&this.speechBubbleAnimation.stop();let i=t.split("");this.speechBubbleAnimation=new h(17,i,!1,(()=>{this.stopSpeak(),e()})),this.speechBubbleAnimation.start(),this.talkAnimation.start(!0)}))}stopSpeak(){this.speaking&&(this.speaking=!1,this.speechBubbleAnimation.stop(),this.speechBubbleAnimation.setIndex(-1),this.updateSpeechBubbleText(),this.talkAnimation.stop(),this.speechBubbleAnimation=null)}isSpeaking(){return this.speaking}setAskInput(){this.submitInput.placeholder=this.askPlaceholderText,this.submitBtn.innerHTML=this.askInputText}setPromptInput(){this.submitInput.placeholder=this.respondPlaceholderText,this.submitBtn.innerHTML=this.respondInputText}constructor(){t(this,"submitBtnId","aliza-submit-btn"),t(this,"submitInputId","aliza-submit-text"),t(this,"transcriptId","aliza-transcript"),t(this,"alizaCanvasId","aliza-portrait-canvas"),t(this,"alizaSpeechId","aliza-speech-bubble"),t(this,"submitBtn",void 0),t(this,"submitInput",void 0),t(this,"transcript",void 0),t(this,"alizaCanvas",void 0),t(this,"alizaSpeech",void 0),t(this,"alizaAssetsURL","./images/aliza_assets"),t(this,"alizaAssetNames",["body.png","eyes1.png","eyes2.png","eyes3.png","mouth1.png","mouth2.png","mouth3.png"]),t(this,"alizaAssetWidth",608),t(this,"alizaAssetHeight",854),t(this,"askInputText","Ask!"),t(this,"askPlaceholderText","Enter your question for ALIZA here..."),t(this,"respondInputText","Respond!"),t(this,"respondPlaceholderText","Enter a response for ALIZA here...")}}class l{async act(){}getName(){return this.name}getDesc(){return this.description}constructor(e){t(this,"name",""),t(this,"description",""),this.chatbot=e}}class o extends l{async act(){let t=new Date,e="";12===t.getMonth()&&31===t.getDate()?gretting="Happy New Years!":e=10===t.getMonth()&&31===t.getDate()?"Happy Halloween!":10===t.getMonth()&&10===t.getDate()?"Happy Thanksgiving!":12===t.getMonth()?"Happy holidays!":2===t.getMonth()&&14===t.getDate()?"Happy Valentine's day!":t.getHours()<=12?"Godd morning!":t.getHours()<=18?"Good afternoon!":t.getHours()<=21?"Good evening!":"Good night!",this.chatbot.speak(e)}constructor(...e){super(...e),t(this,"name","greet")}}class u extends l{async act(){let t=new Date,e=t.getDate(),s=`Today's date is ${this.daysOfWeek[t.getDay()]}, ${this.months[t.getMonth()]} ${e}, ${t.getFullYear()}. The current time is ${t.getHours()}:${t.getMinutes()}.`;this.chatbot.speak(s)}constructor(...e){super(...e),t(this,"name","getTime"),t(this,"description","tell you today's date."),t(this,"months",["January","February","March","April","May","June","July","August","September","October","November","December"]),t(this,"daysOfWeek",["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"])}}class c extends l{async act(){this.chatbot.speak(a(this.messages))}constructor(...e){super(...e),t(this,"name","getGeneric"),t(this,"messages",["Sorry, I don't know that one.","Sorry, I don't know what you mean by that.","I don't understand that input. Sorry about that.","I don't understand."])}}class p extends l{async act(){this.chatbot.speak(this.firstMessage),this.chatbot.prompt((t=>{this.handleInput(t)}))}handleInput(t){let e=this.chatbot.parser.tokenize(t);"YES"===e[0]?this.chatbot.speak(this.generateActionsMessage()):"NO"===e[0]?this.chatbot.speak(a(this.noMessage)):this.chatbot.actions.act("getGeneric")}generateActionsMessage(){let t=a(this.okayMessage),e=this.chatbot.actions.getAllActions(),s=0;for(const[i,n]of e)this.chatbot.actions.isPrivate(n)||(s<e.size-1?t+=` The "${i}" action will have me ${n.getDesc()}`:t+=` Finally, the ${i} action will have me ${n.getDesc()}`),s++;return t+=this.actionMessageEnd,t}constructor(...e){super(...e),t(this,"name","getHelp"),t(this,"description","display this help message again."),t(this,"firstMessage",'To get the best use out of me. I recommend asking only simple questions. I am also capable of certain actions. Would you like to see a list of them? Your options are "Yes" or "No".'),t(this,"noMessage",["Alright then.","Okay. Let me know if you need something."]),t(this,"okayMessage",["Sure thing!","Alright!","Ok!"]),t(this,"actionMessageEnd","I'd also like to mention that you may call these actions by asking me normally or by directly calling them.")}}class d{createActions(){for(const t of this.actionClasses){let e=new t(this.chatbot);this.actions.set(e.name,e)}}act(t){let e=this.actions.get(t);return e instanceof l&&(e.act(),!0)}getAllActions(){return this.actions}isPrivate(t){for(const e of this.privateActions)if(t instanceof e)return!0;return!1}constructor(e){t(this,"actionClasses",[o,u,c,p]),t(this,"privateActions",[o,c]),this.chatbot=e,this.actions=new Map,this.createActions()}}(new class{async start(){this.patterns=await this.parser.loadAndCompile(this.patternFileURL),this.initGUI()}initGUI(){this.gui.init(),this.gui.setSubmitHandler((()=>this.takeInput()))}async takeInput(){let t=this.gui.getInput(),e=this.getResponse(this.parser.tokenize(t)),s=!0;if(""===t&&this.gui.isSpeaking())s=!1,this.gui.stopSpeak();else if(this.prompting)this.promptCallback(t),this.setPrompting(!1);else if(null!=e&&null!=e.match(this.actionPattern)){let t=e.replace(/(?:\r\n|\r|\n|\{|\}|)/g,"","").split(".")[1];this.actions.act(t)}else null!=e?this.speak(e):this.actions.act("getGeneric");s&&this.gui.addToTranscript("YOU",t),this.lastInput=t}getResponse(t){let e=this.patterns.search(t);return null!=e&&e.hasTemplates()?a(e.getTemplates()):null}async speak(t){await this.gui.startSpeak(t),this.gui.addToTranscript("ALIZA",t)}prompt(t){this.gui.clearInputField(),this.setPrompting(!0),this.promptCallback=t}setPrompting(t){t?(this.gui.setPromptInput(),this.prompting=!0):(this.gui.setAskInput(),this.prompting=!1)}constructor(){t(this,"patternFileURL","./data/data_set.alzml"),t(this,"actionPattern",/{action.(.*)}/),this.parser=new i,this.gui=new r,this.actions=new d(this),this.patterns,this.prompting=!1,this.promptCallback=null,this.lastInput=""}}).start();
//# sourceMappingURL=index.4a45d8f2.js.map
