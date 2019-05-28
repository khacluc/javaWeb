
function Calculation(temp) {

    // varible
    this.temp = temp;
    var result = '0';
    var var_number = '';
    var opposite = false;
    var change_sign = false;
    var odd_calculation = '';
    var str_result = '';
    var arr_number = [];
    var max_index_number = 0;
    var arr_calculation = [];
    var max_index_calculation = 0;
    var vip = 0;
    var end = false;

    //  create table html
    var table = document.createElement("div");
    var tableGlobal = document.getElementById("demo");
    tableGlobal.appendChild(table);
    table.innerHTML = "<form class='form bg-secondary'><input id=result" + temp + " class='text' type='text' value='0'><br> <input class='button' type='button' value='CE' ><input class='button' type='button' value='<-' ><input class='button' type='button' value='%' ><input class='button' type='button' value='+' ><br><input class='button' type='button' value='7'><input class='button' type='button' value='8' ><input class='button' type='button' value='9' ><input class='button' type='button' value='-' ><br><input class='button' type='button' value='4' ><input class='button' type='button' value='5' ><input class='button' type='button' value='6' ><input class='button' type='button' value='x'><br><input class='button' type='button' value='1'><input class='button' type='button' value='2' ><input class='button' type='button' value='3'><input class='button' type='button' value='/' > <br><input class='button' type='button' value='+/-' ><input class='button' type='button' value='0' ><input class='button' type='button' value='.' > <input class='button' type='button' value='=' ></form>";

    // event addEventListener
    table.addEventListener("click", function (e) {
        var type = e.target.value;

        if (end) {
            result = '0';
        }

        // save str_result
        if (str_result == '' && var_number == '') {
            str_result = result;
        }
        if (str_result == '0') {
            str_result = '';
        }

        // group number
        if (type == '0' ||
            type == '1' ||
            type == '2' ||
            type == '3' ||
            type == '4' ||
            type == '5' ||
            type == '6' ||
            type == '7' ||
            type == '8' ||
            type == '9' ||
            type == '+/-' ||
            type == '.') {

            end = false
            // change sign
            if (type == '+/-') {

                // change sub is add
                if (opposite) {
                    opposite = false;
                    var_number = var_number.substring(1);
                }

                // change add is sub
                else {
                    opposite = true;
                    var_number = '-' + var_number;
                }
            } else {
                var_number += type;
            }

            change_sign = false;
            // output display
            result = str_result + var_number;
        }

        // group calculation
        if (type == '+' ||
            type == '-' ||
            type == 'x' ||
            type == '/') {

            // chang calculation
            if (change_sign) {

                // change vip
                if ((odd_calculation == '+' || odd_calculation == '-') && (type == 'x' || type == '/')) {
                    vip++;
                }
                if ((odd_calculation == 'x' || odd_calculation == '/') && (type == '+' || type == '-')) {
                    vip--;
                }

                // change odd_calculation
                odd_calculation = type;

                // change array calculation
                arr_calculation[max_index_calculation - 1] = type;

                // change display
                result = result.substring(0, result.length - 1) + type;

            } else {

                // save calculation
                odd_calculation = type;

                // save array number
                arr_number[max_index_number] = parseFloat(var_number);
                max_index_number++;

                // save array calculation
                arr_calculation[max_index_calculation] = type;
                max_index_calculation++;

                // addtion vip
                if (type == 'x' || type == '/') {
                    vip++;
                }

                // display
                result = result + type;
            }

            change_sign = true;
            // reset var_number
            var_number = '';
            str_result = '';
        }

        // CE
        if (type == 'CE') {

            // reset all varible
            result = '0';
            var_number = '';
            opposite = false;
            change_sign = false;
            odd_calculation = '';
            str_result = '';
            arr_number = [];
            max_index_number = 0;
            arr_calculation = [];
            max_index_calculation = 0;
            vip = 0;
        }

        // <- false
        if (type == '<-') {
            var index_end_result = result.length;
            var last_str = result.substring(index_end_result - 1, index_end_result);
            if (last_str == '+' || last_str == '-' || last_str == 'x' || last_str == '/') {

                // change array calculation and vip
                if (last_str == '+' || last_str == '-') {
                    max_index_calculation--;
                    change_sign = false;
                }
                if (last_str == 'x' || last_str == '/') {
                    max_index_calculation--;
                    change_sign = false;
                    vip--;
                }
                var_number = arr_number[max_index_number - 1];
                str_result = '';
            } else {
                var_number = var_number.substring(0, var_number.length - 1);
            }

            // change display
            result = result.substring(0, result.length - 1);
        }

        // %
        if (type == '%') {
            var_number = String(Number(var_number) / 100);
            result = str_result + var_number;
        }

        if (type == '=') {
            end = true;

            // if last result is calculation
            if (var_number == '') {
                arr_number[max_index_number] = '0';
            } else {
                arr_number[max_index_number] = parseFloat(var_number);
            }

            // function parameter
            result = aqual_to(arr_number, max_index_number, arr_calculation, max_index_calculation, vip, result)

            // reset all 
            var_number = '';
            opposite = false;
            change_sign = false;
            odd_calculation = '';
            str_result = '';
            arr_number = [];
            max_index_number = 0;
            arr_calculation = [];
            max_index_calculation = 0;
            vip = 0;

        }

        // render output
        var output = document.getElementById("result" + temp);
        output.value = result;

    })
}
