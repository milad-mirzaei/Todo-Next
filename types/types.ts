
export type todoStatus = 'todo' | 'inProgress' | 'review' | 'done'

export type todo = {
    title:string,
    status: todoStatus,
    _id:string
}

export type todosType ={
    todo?:todo[],
    inProgress?:todo[],
    review?:todo[],
    done?:todo[]
  }
  