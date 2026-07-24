import 'dotenv/config';

function requireEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const env = {
    baseUrl:
        process.env.BASE_URL ??
        'https://monument.stg.monument.io',

    admin: {
        email: requireEnv('ADMIN_EMAIL'),
        password: requireEnv('ADMIN_PASSWORD'),
    },

    noView: {
        email: requireEnv('NO_VIEW_EMAIL'),
        password: requireEnv('NO_VIEW_PASSWORD'),
    },

    viewOnly: {
        email: requireEnv('VIEW_ONLY_EMAIL'),
        password: requireEnv('VIEW_ONLY_PASSWORD'),
    },
};