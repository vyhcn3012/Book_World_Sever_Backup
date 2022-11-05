const autoBind = require( 'auto-bind' );

const credential = {
    "type": "service_account",
    "project_id": "duantotnghiep-e8aff",
    "private_key_id": "902855d5cd5e2a955e362bab6721ac9030f1786e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3gK/Sdz71KSgL\nxl/KIotCu5aS53fUdXMKDxut8NAIEZ2H5Olf5Z47tquIK1XS3Ax4PoJnX2Et9RPU\n+Ga8ybUrDgqL0MGQIfbWH2qg8C4KcLzfRo+0FPz53d9RLEGpJzHoXAeLUdnWrVl+\nznIWnACXS0I38J6X9fKo9AZaIErX+64cyzoqOg5oNqz+HkKFEqvvt8fYTw2WV9p0\ngm/s0DipaEBcmfLJRFawOQlrBGgxyW24me5PbKDdtg20oOCwhSNjMPtZwC8wH5Kb\nnoxBapK0ghkchWBYX9SZVuhg4hMazL3JaFA0X/98/TZHd/0CCSAfd41Wxv3K16X2\nnpJ/LdQLAgMBAAECggEAKsNF9fWNCePP7cKKYxgevOvrQIvJbIz8RI1VxXi3ehHk\n1JzfV9YyRDcjDSYQJ4XZMBJdIErlYijZOMm0Y21cF0773S5GVVjc5XRHzH58NDmm\ngh+28F/tvira1ldKa+ly43PC3FA0RCd8kiT5CFTNfHRw14lu4/nQVVgcvNcGqgMb\nPkPHpUj/2HDmH1XycNOhG5UTQUnZ4/6ufk8xMJ3gZVnO77N1rk9KEDI/3yY2p6kB\nzyDPFRvUIzj+ZGOOSBYR2UtzpivUs/256rbMSSfojj63sTjWWy4YeHU/o2FltO/W\n7G4J22vmUxnyYahv/kfOEfGhroZLeJdx8jlTO0SnsQKBgQDb1mkWc+K0zT0I26Q8\n34LwonRTUq/oXLXqXaAI2csgaJSZ59CNBjXbpv854tLCyDG+jDJr8kEjRSjwnthy\ndUv96t5boVpuGUSKub5y+piuukTEj6Hx72wadcrLaDrr6dRp/GTArGfEtX1IR7P/\nnNhIYOZe8i4N9AHQ6CIpg/2+OwKBgQDVsC1j+Am9Mt6lBwtR9dFF1D79o3+Ylbj+\nkExFvNHE0NgA6brIa2HzK67+ZpN0413p/VWP00kwY3i+5GK/nhsNDuaIupxEUrsv\nKlnxXeGgbGbrES7mzckdfLwtUhQUmtbJ4r0BAvdNtk467V9Fml0dNgLGt2cg0fNV\nQC5kMazUcQKBgAXBk3bXCfSZ+yMkPSSq5Y7PciRMYfa/lrPQR8Rzj3IFyv5Mp5VJ\nuFdMBBrL6aDYBRVsLlXNPg9iXDQQtLIqiBbZ84CKtQd0+ep3+pigHydUEUDkUeU3\n06jNtMWmsQREVx9/UFQLL5xi9CjUV841mSQsBVwvEy2iWfnSWjKkFhzJAoGACP/K\naZNglZ820Sxixajcj1xI6tWf4gUsLUxWaflxvCAveJpfS2F6VotYa05Wl22b3ubU\nW6JCSs9lnmRv5DH8Yahm/Qse2aHCUFIwR4H0ppTqIKwwlXfFKIDATAhQ4C1FLmtm\nGkzNrXAoC0ND5+KAWWKU61l99lvhK43wZjfRV4ECgYEAixBNd1EuJe+Fla5JQjum\neAvrplIrOG76vrlxbMHx94DnXwxivVqIRDHY4zL0+ADLWTqfDny6t21vOAOKDR8R\ng9Bu2OhzCnKnkysUZ7lrBWJmImjECxroOA09lgm7g7kIfvvPxkTT58XG5lKmoD0x\nXp/fnrPCf1cjO4Eq8STthVU=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-608qm@duantotnghiep-e8aff.iam.gserviceaccount.com",
    "client_id": "112933681082643822184",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-608qm%40duantotnghiep-e8aff.iam.gserviceaccount.com"
}

class PushNotifier{

    constructor(){
        this.admin = require("firebase-admin");
        this.admin.initializeApp({credential: this.admin.credential.cert(credential), name: 'fcm'});
        autoBind( this );
    }

    sendNotificationToDeviceAndroid(data, tokenDevices){
        if (!tokenDevices || (tokenDevices && tokenDevices.length == 0)) {
          return;
        }
          // let android = {
          //     priority: "High", //mức độ ưu tiên khi push notification
          //     ttl: '360000',// hết hạn trong 1h
          //     data: data
          // }
          let message = {
              android:{
                notification: {
                  body: 'Day la message',
                  title: 'Day la tieu de'
                }
              },
              apns: {
                headers: {
                  "apns-priority": "10",
                  "apns-expiration": "360000",
                },
                payload: {
                  aps: {
                    alert: {
                      title: 'tieu de',
                      body: 'noi dung',
                    },
                    sound: "default",
                  },
                  data: data,
                },
              },
              tokens: tokenDevices // token của thiết bị muốn push notification
          }
          console.log(message)
          this.admin.messaging().sendMulticast(message)
          .then((response) => {
              console.log(response)
              if (response.failureCount > 0) {
                const failedTokens = [];
                response.responses.forEach((resp, idx) => {
                  if (!resp.success) {
                    failedTokens.push(tokenDevices[idx]);
                    console.log(resp.error)
                  }
                });
                console.log('List of tokens that caused failures: ' + failedTokens);
              }
            });
      }

      sendNotificationToDevices(data, tokenDevices, body, title){
        if (!tokenDevices || (tokenDevices && tokenDevices.length == 0)) {
          return;
        }
          let message = {
              data: data,
              android:{
                notification: {
                  body: body,
                  title: title
                }
              },
              apns: {
                headers: {
                  "apns-priority": "10",
                  "apns-expiration": "360000",
                },
                payload: {
                  aps: {
                    alert: {
                      title: title,
                      body: body,
                    },
                    sound: "default",
                  },
                  data: data,
                },
              },
              tokens: [tokenDevices[tokenDevices.length - 1]] // token của thiết bị muốn push notification
          }
          console.log(data)
          this.admin.messaging().sendMulticast(message)
          .then((response) => {
              console.log(response)
              if (response.failureCount > 0) {
                const failedTokens = [];
                response.responses.forEach((resp, idx) => {
                  if (!resp.success) {
                    failedTokens.push(tokenDevices[idx]);
                  }
                });
                console.log('List of tokens that caused failures: ' + failedTokens);
              }
            });
      }
}

module.exports = new PushNotifier();


  