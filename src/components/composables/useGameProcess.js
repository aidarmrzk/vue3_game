import { FIELD, GAME_STATUS, DEFAULT_DIFFICULT, GAME_SPEED } from "@/constans";
import { nextTick, computed } from "vue";

export function useGameProcess(fields, gameStatus, difficult, start) {
    
    const selectField = (id) => {
        const index = fields.value.findIndex((field) => {
            return field.id === id;
        })

        if (index > -1 && !fields.value[index].clicked) {
            fields.value[index].clicked = true;

            checkGame();
        }
    }

    const checkGame = () => {

        const errorIndex = fields.value.findIndex(field => {
            return field.clicked && field.value === FIELD.EMPTY;
        })

        if (errorIndex > -1) {
            setGameOver();
            return;
        }

        const notFountItemIndex = fields.value.findIndex(field => {
            return !field.clicked && field.value === FIELD.FILLED;
        })

        if (notFountItemIndex === -1) {
            setWin();
        }
    }

    const setGameOver = () => {
        gameStatus.value = GAME_STATUS.FAIL;
        difficult.value = DEFAULT_DIFFICULT;
    }

    const setWin = () => {
        gameStatus.value = GAME_STATUS.WIN;

        setTimeout(async() => {
            difficult.value += 1;

            await nextTick();

            start();
        }, GAME_SPEED)
    }

    const isWin = computed(() => {
        return gameStatus.value === GAME_STATUS.WIN;
    });

    const isFail = computed(() => {
        return gameStatus.value === GAME_STATUS.FAIL;
    });

    return { selectField, isWin, isFail  };
}