import { create } from "zustand";


export const useTodoListStore = create((set) => ({
    list: [],
    addList: (item) => set((state) => ({ list: [...state.list, item] })),
    modifySelected: (index) => set((state) => ({
        list: state.list.map((item) => {
            if (item.id === index) {
                return {
                    ...item,
                    isSelected: !item.isSelected
                }
            }
            else {
                return item
            }
        })
    })),
    deleteAll: () => set(state => ({ list: [] }))
}))