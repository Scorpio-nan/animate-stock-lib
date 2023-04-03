function nextTick(el, callback) {
    var listeners = [];
    var doc = window.docment;
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer;

    function ready(selector, fn) {
        listeners.push({
            selector: selector,
            fn: fn
        })
        if (!observer) {
            observer = new MutationObserver(check);
            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true
            });
        }
        check();
    }

    function check() {
        for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i];
            var elements = doc.querySelectorAll(listener.selector);
            for(var j = 0; j < elements.length; j++) { 
                var element = elements[j];
                if(!element.ready){
                    element.ready = true;
                    listener.fn.call(element, element);
                }
            }
        }
    }

    ready(el, callback);
}

// nextTick('.container', function(el) { })