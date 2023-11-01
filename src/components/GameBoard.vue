<template>
    <div class="board-wrapper">

        <div class="board">
            <BoardItem
            :gameStatus="gameStatus"
            v-for="field in fields"
            :field="field"
            :key="'item-' + field.id"
            @selectField="selectField($event)"
            />
        </div>
    
        <p class="difficult">Сложность: <strong>{{ difficult }}</strong></p>
        <p class="win" v-if="isWin">Поздравляем! Продолжаем играть!</p>
        <p class="fail" v-if="isFail">Вы проиграли. Попробуйте еще раз!</p>
    
        <button class="btn" @click="start" :disabled="!canStartGame">Старт</button>

    </div>
</template>

<script>
import BoardItem from '@/components/BoardItem';
import { useGameInit } from '@/components/composables/useGameInit';
import { useGameStart } from '@/components/composables/useGameStart';
import { useGameProcess } from '@/components/composables/useGameProcess';
import { GAME_STATUS } from '@/constans';
import { ref } from 'vue';

export default {
    name: 'GameBoard',
    props: {},
    components: {
        BoardItem
    },
    setup() {
        const number = 25; 
        const gameStatus = ref(GAME_STATUS.NONE);

        const { difficult, fields, init } = useGameInit(number);

        const { start, canStartGame } = useGameStart(init, difficult, number, fields, gameStatus);

        const { selectField, isWin, isFail } = useGameProcess(fields, gameStatus, difficult, start);

        return {
            number,
            difficult,
            fields,
            init,
            start,
            gameStatus,
            canStartGame,
            selectField,
            isWin,
            isFail
        }
    }
}
</script>

<style scoped>
.board-wrapper {
margin-bottom: 100px;
}
.board {
margin: 0 auto;
width: 300px;
background: #eee;
}
.btn {
    background: #42b983cc;
    color: #fff;
    border: none;
    border-radius: 2px;
    padding: 10px 30px;
    margin: 10px 0;
    cursor: pointer;
    outline: none;
}
.btn:hover {
    background: #42b983;
}
.btn:disabled {
    opacity: 0.5;
}
.win {
    color: #42b983;
}
.fail {
    color: #ff0000;
}
</style>