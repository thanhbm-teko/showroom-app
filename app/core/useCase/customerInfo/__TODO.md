# Thông tin khách hàng

- Loại khách: cá nhân hoặc doanh nghiệp
- Thông tin thuế (chỉ có với khách doanh nghiệp):
  - Mã số thuế
  - Tên công ty
  - Địa chỉ công ty
  - Tùy chọn miễn thuế
  - Phạm vi (loại doanh nghiệp)
- Thông tin người mua:
  - Điện thoại
  - Tên
  - Địa chỉ (tỉnh thành, quận huyện, phường xã, số nhà)
  - Phạm vi (chỉ có với khách cá nhân) gồm mục đích mua, độ tuổi, giới tính
- Thông tin giao hàng:
  - Thời gian
  - Thông tin người nhận (điện thoại, tên, tỉnh thành, quận huyện, phường xã, số nhà)
- Thông tin trả sau:
  - Nợ hiện tại
  - Giá trị đơn
  - Số trả trước
  - Nợ sau đơn
  - Hạn trả
- Thông tin khác:
  - Yêu cầu cài đặt
  - Yêu cầu hỗ trợ kỹ thuật (chỉ khi có giao hàng)
  - Ghi chú
- Khảo sát khách hàng: khách hàng biết tới Phong Vũ qua kênh truyền thông nào

# Use cases

- Form reset:

  - When clicked:
    - Reset the form with empty values

- Customer type:

  - When choose customer type = individual:
    - Hide tax information
    - Show customer scope
    - Keep the information entered before (do not reset the form)
  - When choose customer type = company
    - Show tax information
    - Hide customer scope
    - Keep the information entered before (do not reset the form)

- Tax information:

  - When enter tax code:
    - Trim the spaces
    - Store the value
    - Search in CRM server for a company with this tax code
      - No results: notice no results, user enters remaining tax information
      - 1 result: auto fill remaining tax information with this result
      - Many results: open a dialog for user to choose a company from a list
      - If there is/are result(s): save list of shippings related to this company for shipping suggestion later (1)
  - When check tax-free:
    - If the postpaid form is expanding, reset it with new order value (because of tax-free)
    - Store the value
  - When enter company name/address/scope:
    - Store the values

- Buyer information:

  - When enter buyer phone:
    - Trim the spaces
    - Store the value
    - Search in CRM server for a buyer with this phone
      - No results: notice no results, user enters remaining buyer information
      - 1 result: auto fill remaining buyer information with this result
      - Many results: open a dialog for user to choose a buyer from a list
      - If there is/are result(s): save list of shippings related to this buyer for shipping suggestion later (2)
  - When enter buyer name:
    - Trim the spaces
    - Store the value
  - When choose buyer province:
    - Populate the list of districts inside this province, then auto fill the form with the first district in the province
    - Populate the list of communes inside this district, then auto fill the form with the first commune in the district
    - Store the values
  - When choose buyer district:
    - Populate the list of communes inside this district, then auto fill the form with the first commune in the district
    - Store the values
  - When choose buyer commune/address/scope:
    - Store the values

- Shipping information:

  - When checked:
    - Expand the form
    - Show checkbox 'Technical inspection' in other information section
  - When click 'copy information from buyer':
    - Copy all information from buyer
  - When click 'suggest':
    - Open a dialog for user to choose a shipping address from list (1), (2)
  - When enter time/phone/name/street:
    - Store the values
  - When choose shipping province/district/commune:
    - Same behavior as when choosing buyer province/district/commune

- Postpaid information:

  - When checked:
    - Expand the form
    - Get the latest debt from ASIA server according the buyer/company id get when search buyer/company
  - When enter prepaid amount:
    - Update the debt after field
    - Store the value
  - When enter payment deadline:
    - Store the value

- Other information:

  - When check/enter installation, technical inspection (only with shipping), note:
    - Store the value

- Survey information:

  - When checked:
    - Expand the form
  - When check/enter the fields:
    - Store the values

- Go back:

  - When clicked:
    - Save the information entered

- Create order:
  - When clicked:
    - Validate all data (to show error for invalid phone, name, tax code...)
    - Send buyer + tax + shipping + scope + surveys information to CRM server
    - Create order flow
