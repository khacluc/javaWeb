
// Khởi tạo mảng calculator gồm có 6 máy tính
var calculator = [
    {
        ketqua: document.getElementById("result1"), phim_moi: '', doi_dau: false, doi_phep_tinh: false, phep_tinh_cu: '',
        str_ketqua: '', uu_tien: 0, end: false,
        mang_so: [], mang_so_max_index: 0,
        mang_pt: [], mang_pt_max_index: 0
    },
    {
        ketqua: document.getElementById("result2"), phim_moi: '', doi_dau: false, doi_phep_tinh: false, phep_tinh_cu: '',
        str_ketqua: '', uu_tien: 0, end: false,
        mang_so: [], mang_so_max_index: 0,
        mang_pt: [], mang_pt_max_index: 0
    },
    {
        ketqua: document.getElementById("result3"), phim_moi: '', doi_dau: false, doi_phep_tinh: false, phep_tinh_cu: '',
        str_ketqua: '', uu_tien: 0, end: false,
        mang_so: [], mang_so_max_index: 0,
        mang_pt: [], mang_pt_max_index: 0
    },
    {
        ketqua: document.getElementById("result4"), phim_moi: '', doi_dau: false, doi_phep_tinh: false, phep_tinh_cu: '',
        str_ketqua: '', uu_tien: 0, end: false,
        mang_so: [], mang_so_max_index: 0,
        mang_pt: [], mang_pt_max_index: 0
    },
    {
        ketqua: document.getElementById("result5"), phim_moi: '', doi_dau: false, doi_phep_tinh: false, phep_tinh_cu: '',
        str_ketqua: '', uu_tien: 0, end: false,
        mang_so: [], mang_so_max_index: 0,
        mang_pt: [], mang_pt_max_index: 0
    },
    {
        ketqua: document.getElementById("result6"), phim_moi: '', doi_dau: false, doi_phep_tinh: false, phep_tinh_cu: '',
        str_ketqua: '', uu_tien: 0, end: false,
        mang_so: [], mang_so_max_index: 0,
        mang_pt: [], mang_pt_max_index: 0
    },

];

// Hàm bắt sự kiện onclick
function clickButton(obj, id) {

    var type = obj;

    // xét vòng lặp gán giá trị vào các máy tính
    for (var i = 0; i < 6; i++) {
        if (id == i + 1) {

            // Khi đã kết thúc một phép tính, reset lại giá trị kết quả bằng rỗng
            if (calculator[i].end) {
                calculator[i].ketqua.value = '';
                calculator[i].end = false;
            }
            // Lưu trữ Str_ketqua khi kết thúc phím phép tính
            if (calculator[i].str_ketqua == '' && calculator[i].phim_moi == '') {
                calculator[i].str_ketqua = calculator[i].ketqua.value;
            }
            if (calculator[i].str_ketqua == '0') {
                calculator[i].str_ketqua = '';
            }

            // Các phím số 0 1 2 3 4 5 6 7 8 9 . 
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

                // Đổi phép tính
                calculator[i].doi_phep_tinh = false;

                // Đổi dấu
                if (type == '+/-') {

                    // đổi trừ thành cộng
                    if (calculator[i].doi_dau) {
                        calculator[i].doi_dau = false;
                        calculator[i].phim_moi = calculator[i].phim_moi.substring(1);
                    }

                    // đổi cộng thành trừ
                    else {
                        calculator[i].doi_dau = true;
                        calculator[i].phim_moi = '-' + calculator[i].phim_moi;
                    }
                }
                else {
                    calculator[i].phim_moi += type;
                }

                // hiển thị
                calculator[i].ketqua.value = calculator[i].str_ketqua + calculator[i].phim_moi;
            }

            // Các phím phép tính + - x /
            else if (type == '+' ||
                type == '-' ||
                type == 'x' ||
                type == "/"
            ) {

                // Trước đó có bấm một phép tính
                if (calculator[i].doi_phep_tinh) {

                    if ((calculator[i].phep_tinh_cu == '+' || calculator[i].phep_tinh_cu == '-') && (type == 'x' || type == '/')) {
                        calculator[i].uu_tien++;
                    }
                    if ((calculator[i].phep_tinh_cu == 'x' || calculator[i].phep_tinh_cu == '/') && (type == '+' || type == '-')) {
                        calculator[i].uu_tien--;
                    }

                    // xử lý hiển thị
                    calculator[i].ketqua.value = calculator[i].ketqua.value.substring(0, calculator[i].ketqua.value.length - 1) + type;

                    // Lưu vào mảng phép tính
                    calculator[i].mang_pt[calculator[i].mang_pt_max_index - 1] = type;

                }

                // Trước đó chưa bấm phép tính nào
                else {

                    // ghi nhớ phép tính
                    calculator[i].phep_tinh_cu = type;

                    // Lưu vào mảng số
                    calculator[i].mang_so[calculator[i].mang_so_max_index] = parseFloat(calculator[i].phim_moi);
                    calculator[i].mang_so_max_index++;

                    // lưu vào mảng phép tính
                    calculator[i].mang_pt[calculator[i].mang_pt_max_index] = type;
                    calculator[i].mang_pt_max_index++;

                    // Thực hiện cộng ưu tiên
                    if (type == 'x' || type == '/') {
                        calculator[i].uu_tien++;
                    }

                    // Xử lý hiển thị
                    calculator[i].ketqua.value = calculator[i].ketqua.value + type;
                }

                // Biến đổi phép tính
                calculator[i].doi_phep_tinh = true;
                // Kết thúc phép tính reset lại các biến phim_moi và biến str_ketqua
                calculator[i].phim_moi = '';
                calculator[i].str_ketqua = '';
            }

            // Phím CE
            if (type == 'CE') {

                // format lại tất cả các giá trị setup
                calculator[i].ketqua.value = '0';
                calculator[i].str_ketqua = '';
                calculator[i].phim_moi = '';
                calculator[i].mang_so = [];
                calculator[i].mang_so_max_index = 0;
                calculator[i].mang_pt = [];
                calculator[i].mang_pt_max_index = 0;
                calculator[i].phep_tinh_cu = '';
                calculator[i].doi_dau = false;
                calculator[i].uu_tien = 0;
            }

            // Phím <-
            if (type == "<-") {
                calculator[i].ketqua.value = calculator[i].ketqua.value.substring(0, calculator[i].ketqua.value.length - 1);
                calculator[i].str_ketqua = calculator[i].ketqua.value;
                calculator[i].phim_moi = '';
            }

            // Phím %
            if (type == '%') {

                // Cập nhật phim_moi
                calculator[i].phim_moi = String(Number(calculator[i].phim_moi) / 100);

                // Xử lý hiển thị
                calculator[i].ketqua.value = calculator[i].str_ketqua + calculator[i].phim_moi;
            }

            // Phím =
            if (type == '=') {

                // Kết thúc phép tính
                calculator[i].end = true;

                // setup lại giá trị của mảng số
                if (calculator[i].phim_moi != '') {
                    calculator[i].mang_so[calculator[i].mang_so_max_index] = parseFloat(calculator[i].phim_moi);
                }

                // Gọi hàm tính dấu =
                calculator[i].ketqua.value =
                    phepTinhBang(calculator[i].mang_so, calculator[i].mang_so_max_index, calculator[i].mang_pt, calculator[i].mang_pt_max_index, calculator[i].uu_tien, calculator[i].ketqua.value);

                // reset lại các giá trị sau khi tính
                calculator[i].str_ketqua = '';
                calculator[i].phim_moi = '';
                calculator[i].mang_so = [];
                calculator[i].mang_so_max_index = 0;
                calculator[i].mang_pt = [];
                calculator[i].mang_pt_max_index = 0;
                calculator[i].phep_tinh_cu = '';
                calculator[i].doi_dau = false;
                calculator[i].uu_tien = 0;
            }


        }
    }
}
