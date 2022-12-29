var express = require('express');
var router = express.Router();
var axios = require("axios");
var { encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const profile = require('../../middlewares/profile');

router.get('/', function(req, res, next) {
    const cookie = decryptEnc(req.get("cookie").split("Token=")[1])
    
    profile(cookie).then(pending=>{

        axios({
            method: "post",
            url: "http://15.152.81.150:3000/api/beneficiary/view", 
            headers: {"authorization": "1 " + cookie}
            // data: enData
            // 데이터 안씀
        }).then((data)=>{
            let result = decryptRequest(data.data).data;
            //console.log(result);
            //console.log(pending.data.account_number);
            var html_data = `<thead>
                                <tr>
                                <th>친구계좌</th>
                                <th>승인여부</th>
                                <th width="20%">삭제</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                            `;
            
            result.forEach(function(a){
                html_data += `<tr>
                                <td>${a.beneficiary_account_number}</td>
                                <td>${a.approved}</td>
                                <td>
                                    <form id="${a.beneficiary_account_number}" action="/bank/friend_list/delete" method="post">
                                    <input type="hidden" name="beneficiary_account_number" value="${a.beneficiary_account_number}"/>
                                    <input type="hidden" name="account_number" value="${pending.data.account_number}"/> 
                                    <a onclick="document.getElementById('${a.beneficiary_account_number}').submit();" class="btn btn-google btn-user btn-block">
                                    삭제
                                    </a>
                                    </form>
                                </td>
                            </tr>`;
            })

            html_data += `</tbody>`;

            return res.render("Banking/friend", {html : html_data, pending:pending});
        }).catch(function(error){
            var html_data = "<tr>아싸시군요</tr>";
            return res.render("Banking/friend", {html : html_data, pending:pending});
        });

    })

   
})




router.post('/delete', function (req, res, next) {
    const cookie = decryptEnc(req.get("cookie").split("Token=")[1])

    const beneficiary_account_number = req.body.beneficiary_account_number;
    const account_number1 = req.body.account_number;
     

    const baseData = `{"account_number": "${beneficiary_account_number}"}`;
    const enData = encryptResponse(baseData);
    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/beneficiary/delete",
        headers: {"authorization": "1 " + cookie},
        account_number: account_number1,
        data: enData
    }).then((data) => {
        return res.redirect("/bank/friend_list")
    })
});

module.exports = router;
