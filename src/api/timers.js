import Api from "./http_api";
import { appData } from "../stores.js";
import { get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export const getTimer = () => {
    try {
        return get(appData).modules.timer.data.timer;
    } catch (error) {
        console.error(error);
    }
};

export const setTimer = (habit) => {
    try {
        habit = Object.assign({id: uuidv4()}, habit)
        let ad = get(appData)
        ad.modules.habit.data.habits.push(habit)
        appData.set(ad)
    } catch (error) {
        console.error(error);
    }
};

export const stopTimer = (habit) => { //???
    try {
        let ad = get(appData)
        let i = ad.modules.habit.data.habits.findIndex(obj => obj.id == habit.id);
        ad.modules.habit.data.habits[i] = habit
        appData.set(ad)
    } catch (error) {
        console.error(error);
    } 
};

export const addTimerStatRec = (rec) => {
    try {
        habit = Object.assign({id: uuidv4()}, habit)
        let ad = get(appData)
        ad.modules.habit.data.habits.push(habit)
        appData.set(ad)
    } catch (error) {
        console.error(error);
    }
};

// // Get a pokemon details by name
// export const getPokemonByName = async(name) => {
//     try {
//       const response = await Api.get(`/pokemon/${name}`);
//       return response;
//     } catch (error) {
//       console.error(error);
//     }
// };