import { courseState } from "../store/course";
import { selector } from "recoil";




export const isCourseLoading = selector({
  key:"isCourseLoading",
  get: ({get})=>{
    const state = get(courseState);

    return state.isLoading;
  }
})


export const courseDetail =  selector({
  key:"courseDetail",
  get: ({get})=>{
    const state = get(courseState);

    return state.course
  }
})

export const courseTitile = selector({
  key:"courseTitile",
  get: ({get})=>{
    const state = get(courseState);

  if(state.course){
    return state.course.title;
  }
    else  return "error";
  }
});

export const coursPrice = selector({
  key:"coursPrice",
  get: ({get})=>{
    const state = get(courseState);

  if(state.course){
    return state.course.price;
  }
    else  return "error";
  }
});

export const courseDescription = selector({
  key:"courseDescription",
  get: ({get})=>{
    const state = get(courseState);

  if(state.course){
    return state.course.description;
  }
    else  return "error";
  }
})

export const courseImage = selector({
  key:"courseImage",
  get: ({get})=>{
    const state = get(courseState);

  if(state.course){
    return state.course.imageLink;
  }
    else  return "error";
  }
});