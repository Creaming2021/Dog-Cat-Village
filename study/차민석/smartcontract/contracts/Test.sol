// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TEST { // contract 이름은 TEST
    string public constant name = "TEST token"; // 토큰 이름 TEST token
    string public constant symbol = "TEST"; // 이름 TEST
    uint public constant decimals = 18; // 소수점 18자리
    uint public constant INITIAL_SUPPLY = 1000 * 10 ** decimals; // 초기 발행량 1000.000000000000000000
    string constant test = "You can not see this"; // public 표시가 없는 경우 해당 문구 볼 수 없음
}

