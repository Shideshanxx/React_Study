const CACHE_NAME = 'cache-v2'
self.addEventListener('install', event => {
    console.log('install',event)
    // cache.open(CACHE_NAME)开启一个缓存空间
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
        // 写入缓存，传入一个数组，数组中是需要缓存的文件
        cache.addAll([
            '/',
            './index.css'
        ])
    }))
})
self.addEventListener('activate', event => {
    console.log('activate',event)
    // 清除无用缓存
    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
                return caches.delete(cacheName)
            }
        }))
    }))
})
self.addEventListener('fetch', event => {
    console.log('fetch',event)
    // fetch中可以获取到所有网络资源请求，然后去cache中查询，如果查到了就获取缓存，否则就发起网络请求。
    event.respondWith(caches.open(CACHE_NAME).then(cache => {
        // cache.match 传入一个request对象
        return cache.match(event.request).then(response => {
            // 如果response存在，说明命中缓存，直接返回对应的缓存
            if (response) {
                return response
            }
            // 否则发送网络请求
            return fetch(event.request).then(response => {
                // 添加到缓存
                // cache是一个key-value类型，这里key是event.request，value是response，为了保证response缓存可读取，需要clone()一下
                cache.put(event.request, response.clone());
                return response
            })
        })
    }))
})