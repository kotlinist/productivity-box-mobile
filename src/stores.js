import { writable } from 'svelte/store';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import Home from "./routes/screens/main/fragments/Home.svelte"

export const homeScreenFragment = writable(Home);

let defaultData = {
    appSettings: {},
    modules: {
        habit: {
            data: {
                habits: []
            },
            settings: {}
        },
        todo: {
            data: {
                calendar: {}
            },
            settings: {}
        }
    }
}

function createAppData() {

    const store = writable();

    return {
        ...store,
        increment: () => store.update(data => {
            data.modules.habit.data.testCount += 1
            return data
        }),
        decrement: () => { storage = "boom"; store.update(storage) },
        reset: () => store.set(0),

        // get: () => store.get(),
        set: (data) => store.set(data),
        init: () => {
            Filesystem.readFile({
                path: 'appData.json',
                directory: Directory.Data,
                encoding: Encoding.UTF8
            }).then((result) => { console.log(result.data); store.set(JSON.parse(result.data)) })
                .catch(err => {
                    console.log("=============================")
                    console.log(err)
                    Filesystem.writeFile({
                        path: 'appData.json',
                        data: JSON.stringify(defaultData),
                        directory: Directory.Data,
                        encoding: Encoding.UTF8
                    }).then(() => { store.set(defaultData) });
                })

            store.subscribe((data) => {
                Filesystem.writeFile({
                    path: 'appData.json',
                    data: JSON.stringify(data),
                    directory: Directory.Data,
                    encoding: Encoding.UTF8
                })
            })
        }
    };
}

export const appData = createAppData()

// count.update(o => {
//     o.n++;
//     return o;
//   });