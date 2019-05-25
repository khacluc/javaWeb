
function phepTinhBang(mang_so, mang_so_max_index, mang_pt, mang_pt_max_index, uu_tien, ketqua) {
    mang_pt_max_index--;
    // Tính phép tính nhân và chia
    while (uu_tien > 0) {
        for (var i = 0; i <= mang_pt_max_index; i++) {
            if (mang_pt[i] == 'x' || mang_pt[i] == '/') {
                // lay 2 so hang
                var so_hang_1 = mang_so[i];
                var so_hang_2 = mang_so[i + 1];
                // tinh phep nhan va chia
                var ket_qua_tam = 0;
                if (mang_pt[i] == 'x') {
                    ket_qua_tam = so_hang_1 * so_hang_2;
                }
                else if (so_hang_2 == 0 || so_hang_1 == 0) {
                    ketqua = "0";
                }
                else if (mang_pt[i] == '/') {
                    ket_qua_tam = so_hang_1 / so_hang_2;
                }
                //  thay the so hang
                mang_so[i] = ket_qua_tam;
                // don so hang
                for (var i2 = i + 1; i2 < mang_so_max_index; i2++) {
                    mang_so[i2] = mang_so[i2 + 1];
                }
                mang_so_max_index--;
                // don phep tinh
                for (var i2 = i; i2 < mang_pt_max_index; i2++) {
                    mang_pt[i2] = mang_pt[i2 + 1];
                }
                mang_pt_max_index--;

                // xoa ghi nho uu tien
                uu_tien--;

                // kết thúc vòng lặp
                break;

            }
        }
    }

    // Tính phép tính cộng và trừ
    while (mang_so_max_index > 0) {
        // lay hai so hang
        var so_hang_1 = mang_so[0];
        var so_hang_2 = mang_so[1];
        // tinh toan
        var ket_qua_tam = 0;
        if (mang_pt[0] == '+') {
            ket_qua_tam = so_hang_1 + so_hang_2;
        }
        else {
            ket_qua_tam = so_hang_1 - so_hang_2;
        }
        //  thay the so hang
        mang_so[0] = ket_qua_tam;
        // don so hang
        for (var i2 = 1; i2 < mang_so_max_index; i2++) {
            mang_so[i2] = mang_so[i2 + 1];
        }
        mang_so_max_index--;

        // xoa bo phep tinh
        for (var i2 = 0; i2 < mang_pt_max_index; i2++) {
            mang_pt[i2] = mang_pt[i2 + 1];
        }
        mang_pt_max_index--;
    }
    ketqua = mang_so[0];
    return ketqua;

}