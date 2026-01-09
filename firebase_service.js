
class FirebaseService {
    constructor() {
        this.db = null;
        this.init();
    }

    init() {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            this.db = firebase.firestore();
            console.log("Firebase Firestore Initialized");
        } else {
            console.warn("Firebase not initialized yet. Waiting...");
            // Retry logic or wait for main init
        }
    }

    // --- Chat Persistence ---
    async saveChat(userId, messages) {
        if (!this.db || !userId) return;
        try {
            await this.db.collection('users').doc(userId).collection('chats').doc('ai_coach_history').set({
                messages: messages,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (e) {
            console.error("Error saving chat:", e);
        }
    }

    async loadChat(userId) {
        if (!this.db || !userId) return [];
        try {
            const doc = await this.db.collection('users').doc(userId).collection('chats').doc('ai_coach_history').get();
            if (doc.exists) {
                return doc.data().messages || [];
            }
        } catch (e) {
            console.error("Error loading chat:", e);
        }
        return [];
    }

    // --- Resume Persistence ---
    async saveResumeDraft(userId, resumeData) {
        if (!this.db || !userId) return;
        try {
            await this.db.collection('users').doc(userId).collection('resumes').doc('draft_v1').set({
                data: resumeData,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Resume draft saved");
        } catch (e) {
            console.error("Error saving resume:", e);
        }
    }

    async loadResumeDraft(userId) {
        if (!this.db || !userId) return null;
        try {
            const doc = await this.db.collection('users').doc(userId).collection('resumes').doc('draft_v1').get();
            if (doc.exists) {
                return doc.data().data;
            }
        } catch (e) {
            console.error("Error loading resume:", e);
        }
        return null;
    }
}

// Global Singleton
window.firebaseService = new FirebaseService();
