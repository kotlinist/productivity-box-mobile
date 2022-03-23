import Api from "./http_api";
import { appData } from "../stores.js";
import { get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export const getCalendarTasks = (date) => {
    try {
        return get(appData).modules.todo.data.calendar[date];
    } catch (error) {
        console.error(error);
    }
};

export const updateCalendarTasks = (date, tasks) => {
    try {
        let ad = get(appData)
        ad.modules.todo.data.calendar[date] = tasks
        appData.set(ad)
    } catch (error) {
        console.error(error);
    }
};

export const addCalendarTask = (date, task) => {
    try {
        task = Object.assign({id: uuidv4()}, task)
        let ad = get(appData)
        if(!ad.modules.todo.data.calendar[date]) ad.modules.todo.data.calendar[date] = []
        ad.modules.todo.data.calendar[date].push(task)
        appData.set(ad)
    } catch (error) {
        console.error(error);
    }
};

export const updateCalendarTask = (date, task) => {
    try {
        let ad = get(appData)
        let i = ad.modules.todo.data.calendar[date].findIndex(obj => obj.id == task.id);
        ad.modules.todo.data.calendar[date][i] = task
        appData.set(ad)
    } catch (error) {
        console.error(error);
    }
};

export const removeCalendarTask = (date, id) => {
    try {
        let ad = get(appData)
        let i = ad.modules.todo.data.calendar[date].findIndex(obj => obj.id == id);
        ad.modules.todo.data.calendar[date].splice(i, 1)
        appData.set(ad)
    } catch (error) {
        console.error(error);
    }
};