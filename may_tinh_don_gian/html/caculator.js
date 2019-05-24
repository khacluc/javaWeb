
// doi dau
var doi_dau = false;

// so phep tinh duoc uu tien
var uu_tien = 0;
// bam phep tinh
var doi_phep_tinh = false;

//ghi nho phep tinh cu neu co thay doi phep tinh
var phep_tinh_cu = '';

// ket thuc phep tinh
var end = false;
// mang ghi nho so hang
var mang_so_max_index = 0;
var mang_so = new Array();

// mang ghi nho cac phep tinh
var mang_pt_max_index = 0;
var mang_pt = new Array();

// object ket qua
var ketqua = document.getElementById("ketqua");
// ket qua hien thi dang co
var str_ketqua = '';
// phim moi
var phim_moi = '';

// cai dat su kien
function clickButton(obj) {
    var type = obj;

    if (end) {
        ketqua.value = '';
        end = false;
    }
    // chuoi hien tai cua ket qua
    if (str_ketqua == '' && phim_moi == '') {
        str_ketqua = ketqua.value;
    }
    if (str_ketqua == '0') {
        str_ketqua = '';
    }

    // Nhom so
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
        doi_phep_tinh = false;
        // doi dau
        if (type == '+/-') {
            // doi tru thanh cong
            if (doi_dau) {
                doi_dau = false;
                phim_moi = phim_moi.substring(1);
            }
            // cong cong thanh tru
            else {
                doi_dau = true;
                phim_moi = '-' + phim_moi;
            }
        }
        // so 
        else {
            phim_moi += type;

        }
        // thay doi hien thi
        ketqua.value = str_ketqua + phim_moi;

    }
    else if (type == '+' ||
        type == '-' ||
        type == 'x' ||
        type == "/"
    ) {
        // truoc do co bam 1 phep tinh
        if (doi_phep_tinh) {
            //neu phep tinh cu la uu tien, nhung phep tinh moi la khong uu tien
            if ((phep_tinh_cu == 'x' || phep_tinh_cu == '/') && (type == '+' || type == '-')) {
                uu_tien--;
            }
            if ((phep_tinh_cu == '+' || phep_tinh_cu == '-') && (type == 'x' || type == '/')) {
                uu_tien++;
            }

            // Lưu vào mảng phép tính
            mang_pt[mang_pt_max_index - 1] = type;
            // xu ly hien thi
            ketqua.value = ketqua.value.substring(0, ketqua.value.length - 1) + type;
        }
        // chua co bam phep tinh
        else {
            // ghi nho phep tinh
            phep_tinh_cu = type;
            // lưu vào mảng số
            mang_so[mang_so_max_index] = parseFloat(phim_moi);
            mang_so_max_index++;

            // lưu vào mảng phép tính
            mang_pt[mang_pt_max_index] = type;
            mang_pt_max_index++;
            // xu ly hien thi
            ketqua.value = ketqua.value + type;

            // cong so dem uu tien
            if (type == 'x' || type == '/') {
                uu_tien++;
            }
        }
        // ghi nhan da doi phep tinh
        doi_phep_tinh = true;
        // ket thuc mot phep tinh set lai cac gia tri phim_moi va str_ketqua
        phim_moi = '';
        str_ketqua = '';
        // doi_dau = false;
    }

    // Nhóm tính kết quả
    else if (type == 'CE') {
        // format lại các biến số
        phim_moi = '';
        str_ketqua = '';
        phep_tinh_cu = '';
        mang_pt = new Array();
        mang_so = new Array();
        mang_pt_max_index = 0;
        mang_so_max_index = 0;
        ketqua.value = 0;
        doi_dau = false;
        uu_tien = 0;
    }
    else if (type == '<-') {
        ketqua.value = ketqua.value.substring(0, ketqua.value.length - 1);
        str_ketqua = ketqua.value;
        phim_moi = '';
    }
    // phím phần trăm
    else if (type == '%') {
        // cập nhật phím mới
        phim_moi = String(Number(phim_moi) / 100);
        // xư lý hiển thị
        ketqua.value = str_ketqua + phim_moi;
        // mang_so[mang_so_max_index] = parseFloat(phim_moi);
        // tinhPhanTram();
        // goi ham tinh %
    }
    else if (type == '=') {
        debugger
        end = true;
        if (phim_moi != '') {
            mang_so[mang_so_max_index] = parseFloat(phim_moi);
        }

        // goi ham tinh =
        tinhPhepBang();
        // reset
        phim_moi = '';
        str_ketqua = '';
        phep_tinh_cu = '';
        mang_pt = new Array();
        mang_so = new Array();
        mang_pt_max_index = 0;
        mang_so_max_index = 0;
        doi_dau = false;
        uu_tien = 0;

    }
}
// function tinhPhanTram() {
//     mang_pt_max_index--;
//     // kiem tra mang so chi co 2 phan tu va phan tu thu 2 phai khac 0
//     if (mang_so_max_index != 2 && mang_so[1] == 0) {
//         ketqua.value = "0";
//     }
//     // phai co 1 phep tinh
//     else if (mang_pt_max_index != 0) {
//         ketqua.value = "0";
//     }
//     // kiem tra mang phep tinh phai la chia
//     else if (mang_pt[0] != '/') {
//         ketqua.value = "0";
//     }
//     else {
//         var kq = mang_so[0] / mang_so[1] * 100;
//         ketqua.value = kq;
//     }
// }

// ham tinh phep tinh bang
function tinhPhepBang() {
    // phép tính %
    // debugger;
    // for (var i = 0; i < mang_pt_max_index; i++) {
    //     // Tính phần trăm
    //     if (mang_pt[i] == '%') {
    //         mang_so[i] = mang_so[i] / 100;
    //         // dồn phép tính
    //         for (var i2 = i; i2 < mang_pt_max_index; i2++) {
    //             mang_pt[i2] = mang_pt[i2 + 1];
    //         }
    //         // mang_pt_max_index--;
    //     }

    // }
    // giảm giá trị của mảng index khi bấm dấu bằng
    mang_pt_max_index--;


    // tinh uu tien
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
                else if (so_hang_2 == 0) {
                    ketqua.value = "0";
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

                // console.log(mang_so)
                // console.log(mang_pt)
            }

        }
    }


    // phep tinh thuong
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

        console.log(mang_so)
        console.log(mang_pt)


    }
    ketqua.value = mang_so[0];


}

