class NewsHub {
    subscribers = {};
  
    subscribe(eventName, callbackFunction){
      if (this.subscribers.hasOwnProperty(eventName)){
        this.subscribers[eventName].push(callbackFunction);    
      } else {
        this.subscribers[eventName] = [callbackFunction];
      }
    };
    
    publish(eventName, dataObject){
      let callbacks = this.subscribers[eventName] || [];
      callbacks.map(theFunc=>{
        theFunc(dataObject);
      });
    }
  }
  
  let espn = new NewsHub();
  
  let andy = {"name": "Andy", "JaguarsLove":100, "fanTheFire": function(anArticle){ 
    this.JaguarsLove += 100;
    console.log(`The article "${anArticle.title}" just makes me more excited ${(anArticle.tone >= 0 ? "because it's positive!" : "haters fuel me.")}`);                                                                            
  }};
  
  let tom = {"name": "Tom", "JaguarsLove":0, "genericReaction": function(anArticle){ this.JaguarsLove += anArticle.tone;}};
  
  
  console.log(andy);
  console.log(tom);
  
  espn.subscribe("JagsNews", andy.fanTheFire.bind(andy));
  
  espn.subscribe("JagsNews", tom.genericReaction.bind(tom));
  
  espn.publish("JagsNews", {title:"Everyone hates the Jaguars", tone: -1});
  
  console.log(andy);
  console.log(tom);