import { getListClassCourse } from "./getListClassCourse.js";
import {
    addLop,
    addTKBLop,
    changeSelectTKB,
    editLop,
    inputCapNhat,
    removeLop,
    removeTKB,
} from "./addLop.js";
import { loadTKB } from "./loadTKB.js";

export function modangky() {
    addLop();
    inputCapNhat();
    editLop();
    removeLop();
    addTKBLop();
    removeTKB();
    changeSelectTKB();
    getListClassCourse();
    loadTKB()
}
