## My Tetris

> javascript(typescript)로 테트리스를 구현한다.

### 🏢 Build
- build는 parcel로 한다.
- [parcel typescript 설정](https://parceljs.org/languages/typescript/)

### 🚦 Start
``` shell
npm run serve
```



## 🤔
현재 블록과 필드(grid)를 분리해서 각각의 객체로 만들어 구현한다.
현재 블록에서 한 단계 내렸을때 위치를 파악하여 해당 위치 좌표들이 현재 필드에 중복되는지 있는지 확인해서 중복되지 않는다면 블록의 좌표를 하나 내리고 아니라면, freeze(현재 블록을 필드에 추가) 시킨다.

