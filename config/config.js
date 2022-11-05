const path = require('path')

module.exports.getConfig = () => {
    const config = {
        'MODE': 'Development',             
        'PORT': process.env.PORT || 5555,
        'MONGO_URL': 'mongodb+srv://admin:30122002@cluster0.qlxgh.mongodb.net/?retryWrites=true&w=majority',
        'MONGO_RESTORE_URL': 'mongodb+srv://admin:30122002@cluster0.qlxgh.mongodb.net/?retryWrites=true&w=majority',
        'JWT_SECRET': 'R4ND0M5TR1NG',
        'JWT_TOKEN_LIFETIME': 30 * 24 * 60 * 60, // 60 MINUTES IN SECOND
        'COOKIE_TOKEN_LIFETIME': 30 * 24 * 60 * 60 * 1000, // 60 MINUTES IN NANO SECOND
        'GOOGLE_CLIENT_ID': '1078600024718-r4kttklrp4av6li4mqs9b5ctnhbm6aob.apps.googleusercontent.com',
        'GOOGLE_CLIENT_SECRET': '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',
        'GOOGLE_REDIRECT_URL': `/cpanel/home/auth_callback`,
        'GOOGLE_SCOPE': ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email',],
        'EMAIL_GOOGLE_TESTING': 'book.world.duan1@gmail.com',
        'CLOUDINARY_CLOUD_NAME': 'cao-ng-fpt-polytechnic',
        'CLOUDINARY_API_KEY': '811123551641114',
        'CLOUDINARY_API_SECRET': '6DMIjAlUUCS8tRoJrDNSd_yqqCg',
        'GMAIL_MAIL_DOMAIN': '@gmail.com',
        'USER_BOOK_STATUS': {
            'REGISTER': 1,
        },
        'ROLE_USER': {
            'USER': 1,
            'AUTHOR': 2,
            'MANAGER': 10,
            'ADMIN': 99,
            'SUPER_ADMIN': 100,
        },
        'AUTHOR_ACCOUNT_STATUS': {
            'CLOSE': 1, // Tài khoản user
            'PENDING': 2, // Tài khoản đang chờ duyệt
            'ACTIVE': 3, // Tài khoản đã được duyệt
        },
    }

    // Modify for Production
    if (process.env.NODE_ENV === 'production') {
        config.MODE = 'Production';
        config.HOST = `https://bookofword.herokuapp.com`;
    } else {
        // local
        config.HOST = `http://localhost:${process.env.PORT || 5555}`;
    }
    config.GOOGLE_REDIRECT_URL = `${config.HOST}/cpanel/home/auth_callback`;

    return config
}
