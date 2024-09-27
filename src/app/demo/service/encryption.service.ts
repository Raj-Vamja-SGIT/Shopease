import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EncryptionService {
    private secretKey: string = environment.secretKey;

    constructor() {}

    // Encrypt the data
    encryptData(data: any): string {
        try {
            return CryptoJS.AES.encrypt(
                JSON.stringify(data),
                this.secretKey
            ).toString();
        } catch (e) {
            console.error('Error encrypting data', e);
            return '';
        }
    }

    // Decrypt the data
    decryptData(data: string): any {
        try {
            const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
            if (bytes.toString()) {
                return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }
            return null;
        } catch (e) {
            console.error('Error decrypting data', e);
            return null;
        }
    }

    // Store encrypted data in localStorage
    setEncryptedData(key: string, value: any) {
        const encryptedValue = this.encryptData(value);
        localStorage.setItem(key, encryptedValue);
    }

    // Get decrypted data from localStorage
    getDecryptedData(key: string): any {
        const encryptedValue = localStorage.getItem(key);
        if (encryptedValue) {
            return this.decryptData(encryptedValue);
        }
        return null;
    }

    // Clear localStorage
    clearData(key: string) {
        localStorage.removeItem(key);
    }
}
