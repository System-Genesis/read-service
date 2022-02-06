import { writeFileSync } from 'fs';

(async () => {
    // console.log(
    //   app._router.stack // registered routes
    //     .filter((r) => r.route) // take out all the middleware
    //     .map((r) => r.route.path)
    // );
    const routers: string[] = [];
    function print(path, layer) {
        if (layer.route) {
            layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
        } else if (layer.name === 'router' && layer.handle.stack) {
            layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
        } else if (layer.method) {
            routers.push(layer.method.toUpperCase() + ' ' + path.concat(split(layer.regexp)).filter(Boolean).join('/'));
        }
    }

    function split(thing) {
        if (typeof thing === 'string') {
            return thing.split('/');
        } else if (thing.fast_slash) {
            return '';
        } else {
            var match = thing
                .toString()
                .replace('\\/?', '')
                .replace('(?=\\/|$)', '$')
                .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
            return match ? match[1].replace(/\\(.)/g, '$1').split('/') : '<complex:' + thing.toString() + '>';
        }
    }

    app._router.stack.forEach(print.bind(null, []));

    console.log(routers);

    writeFileSync('./routers.json', JSON.stringify(routers));
})();
