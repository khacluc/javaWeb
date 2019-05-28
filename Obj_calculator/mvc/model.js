function aqual_to(arr_number, max_index_number, arr_calculation, max_index_calculation, vip, result) {
    max_index_calculation--;
    // Multiplication and division
    while (vip > 0) {
        for (var i = 0; i <= max_index_calculation; i++) {
            if (arr_calculation[i] == 'x' || arr_calculation[i] == '/') {
                // push 2 number
                var number_1 = arr_number[i];
                var number_2 = arr_number[i + 1];
                // multiplication
                var visual_result = 0;
                if (arr_calculation[i] == 'x') {
                    visual_result = number_1 * number_2;
                }
                else if (number_2 == 0 || number_1 == 0) {
                    result = "0";
                }
                // division
                else if (arr_calculation[i] == '/') {
                    visual_result = number_1 / number_2;
                }
                //  change number
                arr_number[i] = visual_result;
                // new array number
                for (var i2 = i + 1; i2 < max_index_number; i2++) {
                    arr_number[i2] = arr_number[i2 + 1];
                }
                max_index_number--;
                // new array calculation
                for (var i2 = i; i2 < max_index_calculation; i2++) {
                    arr_calculation[i2] = arr_calculation[i2 + 1];
                }
                max_index_calculation--;

                // save vip
                vip--;

                // break
                break;

            }
        }
    }

    // addition and subtraction
    while (max_index_number > 0) {
        // push 2 number
        var number_1 = arr_number[0];
        var number_2 = arr_number[1];
        // add and sub
        var visual_result = 0;
        if (arr_calculation[0] == '+') {
            visual_result = number_1 + number_2;
        }
        else {
            visual_result = number_1 - number_2;
        }
        //  new number 1
        arr_number[0] = visual_result;
        // new array number
        for (var i2 = 1; i2 < max_index_number; i2++) {
            arr_number[i2] = arr_number[i2 + 1];
        }
        max_index_number--;

        // new array calculation
        for (var i2 = 0; i2 < max_index_calculation; i2++) {
            arr_calculation[i2] = arr_calculation[i2 + 1];
        }
        max_index_calculation--;
    }
    result = arr_number[0];
    return result;

}