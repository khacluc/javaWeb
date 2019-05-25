
// Tham chiếu đến bảng table
var table = document.getElementById("table"),
    r_index;

// Hàm thêm hàng vào table
function addTable() {

    // Khởi tạo các row tham chiếu đến table
    var table = document.getElementById("table"),
        newRow = table.insertRow(table.length),

        // Chia các cột trong một hàng
        cell1 = newRow.insertCell(0),
        cell2 = newRow.insertCell(1),
        cell3 = newRow.insertCell(2),
        cell4 = newRow.insertCell(3),
        cell5 = newRow.insertCell(4),
        cell6 = newRow.insertCell(5),

        // Tham chiếu đến giá trị của form thông tin
        ma_sv = document.getElementById("ma_sv").value,
        ho_ten = document.getElementById("ho_ten").value,
        lop = document.getElementById("lop").value,
        diem_trung_binh = document.getElementById("diem_trung_binh").value,
        email = document.getElementById("email").value,
        gioi_tinh = document.getElementById("gioi_tinh").value;

    // Gán các giá trị vào trong các cột trong hàng
    cell1.innerHTML = ma_sv;
    cell2.innerHTML = ho_ten;
    cell3.innerHTML = lop;
    cell4.innerHTML = diem_trung_binh;
    cell5.innerHTML = email;
    cell6.innerHTML = gioi_tinh;

    // khởi tạo cột chỉnh sửa
    var chinh_sua = document.getElementById("chinh_sua");

    // gán giá trị vào cột thứ 6
    chinh_sua = newRow.insertCell(6);

    // tạo nút sửa
    var button_sua = document.createElement("button");
    button_sua.setAttribute('type', 'button');
    button_sua.setAttribute('name', 'Sửa');
    button_sua.innerHTML = "Sửa";
    button_sua.setAttribute('class', 'mr-2 btn btn-info');
    button_sua.setAttribute("onclick", `selecteRow()`);
    chinh_sua.appendChild(button_sua);

    // tạo nút xóa
    var button_xoa = document.createElement("button");
    button_xoa.setAttribute('type', 'button');
    button_xoa.setAttribute('name', 'Xóa');
    button_xoa.innerHTML = "Xóa";
    button_xoa.setAttribute('class', 'btn btn-info');
    button_xoa.setAttribute("onclick", "deleteSV(this)");
    chinh_sua.appendChild(button_xoa);

}

// Hàm nhập lại thông tin sinh viên
function cancel() {

    // Tham chiếu đến các vị trí của biến
    var ma_sv = document.getElementById("ma_sv"),
        ho_ten = document.getElementById("ho_ten"),
        lop = document.getElementById("lop"),
        diem_trung_binh = document.getElementById("diem_trung_binh"),
        email = document.getElementById("email"),
        gioi_tinh = document.getElementById("gioi_tinh");

    // reset các giá trị về trạng thái rỗng
    ma_sv.value = '';
    ho_ten.value = '';
    lop.value = '';
    diem_trung_binh.value = '';
    email.value = '';
    gioi_tinh.value = '';
}

// Xóa một hàng trong bảng danh sách sinh viên
function deleteSV(r_index) {

    // Khởi tạo biến tham chiếu đến các hàng trong table
    var table = document.getElementById("table");

    // Xóa hàng
    var i = r_index.parentNode.parentNode.rowIndex;
    table.deleteRow(i);
}

// Hàm chọn hàng - selectRow
function selecteRow() {
    for (var i = 1; i < table.rows.length; i++) { // Tìm kiếm vị trí sự kiện onclick xảy ra sau đó gán vị trí đó và r_index

        // lấy giá trị chọn ra form
        table.rows[i].onclick = function () {
            r_index = this.rowIndex;
            document.getElementById("ma_sv").value = this.cells[0].innerHTML;
            document.getElementById("ho_ten").value = this.cells[1].innerHTML;
            document.getElementById("lop").value = this.cells[2].innerHTML;
            document.getElementById("diem_trung_binh").value = this.cells[3].innerHTML;
            document.getElementById("email").value = this.cells[4].innerHTML;
            document.getElementById("gioi_tinh").value = this.cells[5].innerHTML;
        }
    }
}


// Hàm sửa lại thông tin danh sách sinh viên
function editSV() {

    // Tham chiếu đến giá trị của form thông tin
    ma_sv = document.getElementById("ma_sv").value,
        ho_ten = document.getElementById("ho_ten").value,
        lop = document.getElementById("lop").value,
        diem_trung_binh = document.getElementById("diem_trung_binh").value,
        email = document.getElementById("email").value,
        gioi_tinh = document.getElementById("gioi_tinh").value;

    // lưu lại giá trị thay đổi vào hàng
    // r_index có tác dụng để biết tham số truyền vào hàng nào.
    table.rows[r_index].cells[0].innerHTML = ma_sv;
    table.rows[r_index].cells[1].innerHTML = ho_ten;
    table.rows[r_index].cells[2].innerHTML = lop;
    table.rows[r_index].cells[3].innerHTML = diem_trung_binh;
    table.rows[r_index].cells[4].innerHTML = email;
    table.rows[r_index].cells[5].innerHTML = gioi_tinh;
}

// hàm save phân biệt khi cần thêm mới hay sửa thông tin
function Save() {
    if (r_index) editSV()
    else addTable()
}

// Hàm tìm kiếm thông tin của danh sách sinh viên
function searchSV() {
    var search = document.getElementById("search").value;
    var max_row = table.rows.length;

    // Làm hiện các rows ẩn trong table
    for (var i = 1; i < max_row; i++) {
        if (table.rows[i].style.display == 'none') {
            table.rows[i].style.display = '';
        }
    }

    // So sánh và none các rows không thỏa mãn điều kiện
    for (var i = 1; i < max_row; i++) {
        var ma_sv = table.rows[i].cells[0].innerHTML,
            ho_ten = table.rows[i].cells[1].innerHTML,
            lop = table.rows[i].cells[2].innerHTML,
            diem_trung_binh = table.rows[i].cells[3].innerHTML,
            email = table.rows[i].cells[4].innerHTML,
            gioi_tinh = table.rows[i].cells[5].innerHTML;
        if (search == '') {
            table.rows[i].style.display = '';
        }
        if (search != ma_sv && search != ho_ten && search != lop && search != diem_trung_binh && search != email && search != gioi_tinh && search != '') {
            table.rows[i].style.display = 'none';
        }
    }


}
