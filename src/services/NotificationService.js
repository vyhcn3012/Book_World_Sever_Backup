'use strict';
const { Service } = require('../../system/services/Service');
const autoBind = require('auto-bind');
const { HttpResponse } = require('../../system/helpers/HttpResponse');

const config = require('../../config/config').getConfig();

const PushNotification = require('../../config/fcm');
class NotificationService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }

    async createNotification(body){
        try {
            console.log("===> body", body);
            const item = await this.model.create(body);
                if (item) {
                    return new HttpResponse(item);
                }
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async sendFCM(token, _id, notification_id) {
        try {
            const noti_addPoint = {
                content: `Bạn được cộng 8 điểm cho việc tham gia sự kiện 'Tên sự kiện'`,
                user: _id,
                isRead: false,
                isSent: true,
                notification: notification_id,
            }

            const fcm = {
                content: noti_addPoint.content.toString(),
                user: noti_addPoint.user.toString(),
                isRead: noti_addPoint.isRead.toString(),
                notification: noti_addPoint.notification.toString(),
            }

            PushNotification.sendNotificationToDevices(fcm, [token], 'Day la body', 'Day la title');
            return new HttpResponse([]);
        } catch (e) {
            console.log(e)
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        }
    }
}

module.exports = { NotificationService };