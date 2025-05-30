import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

export default function Wishes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  // Subscribe to real-time updates
  useEffect(() => {
    const q = query(collection(db, "wishes"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(updatedComments);
    });

    return () => unsubscribe();
  }, []);

  const nextWish = () => {
    setCurrentIndex((prev) => (prev + 1) % comments.length);
  };

  const prevWish = () => {
    setCurrentIndex((prev) => (prev - 1 + comments.length) % comments.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) {
      alert("Барлық өрістерді толтырыңыз");
      return;
    }

    try {
      await addDoc(collection(db, "wishes"), {
        userName: userName.trim(),
        comment: newComment.trim(),
        timestamp: serverTimestamp(),
      });

      // Clear form
      setNewComment("");
      setUserName("");
      setIsCommenting(false);
    } catch (error) {
      console.error("Error adding wish:", error);
      alert("Қате шықты. Қайталап көріңіз.");
    }
  };

  const CommentForm = (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="p-4 space-y-4">
        {/* Name Input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-sm">Сіздің атыңыз</span>
          </div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Атыңызды енгізіңіз..."
            className="w-full px-4 py-3 rounded-lg bg-gray-50/50 border border-gray-200"
            required
          />
        </div>

        {/* Message Input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-sm">Тілегіңіз</span>
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Жас жұптарға тілегіңізді жазыңыз..."
            className="w-full px-4 py-3 rounded-lg bg-gray-50/50 border border-gray-200 h-32 resize-none"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-2 p-4 border-t border-gray-100">
        <button
          type="submit"
          className="flex-1 bg-rose-500 text-white px-4 py-3 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Тілек жіберу</span>
        </button>
      </div>
    </motion.form>
  );

  const WishesSlider = (
    <div className="relative bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-rose-100 mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {comments[currentIndex]?.userName?.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">
                {comments[currentIndex]?.userName}
              </h4>
              <span className="text-xs text-gray-500">
                {comments[currentIndex]?.timestamp
                  ?.toDate()
                  .toLocaleDateString()}
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed pl-13">
            {comments[currentIndex]?.comment}
          </p>
        </motion.div>
      </AnimatePresence>

      {comments.length > 1 && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          <button
            onClick={prevWish}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={nextWish}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section
      id="wishes"
      className="min-h-screen relative overflow-hidden py-20"
    >
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-medium text-gray-800">Тілектер</h3>
          <button
            onClick={() => setIsCommenting(!isCommenting)}
            className="flex items-center gap-2 text-rose-500 hover:text-rose-600"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Тілек жазу</span>
          </button>
        </div>

        {/* Single Wishes Carousel */}
        {comments.length > 0 && (
          <div className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-rose-100 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-4"
              >
                <h4 className="font-medium text-gray-800 text-xl">
                  {comments[currentIndex].userName}
                </h4>
                <p className="text-gray-600 text-lg italic">
                  "{comments[currentIndex].comment}"
                </p>
                <span className="text-sm text-gray-400">
                  {comments[currentIndex].timestamp
                    ?.toDate()
                    .toLocaleDateString()}
                </span>
              </motion.div>
            </AnimatePresence>

            {comments.length > 1 && (
              <>
                <button
                  onClick={prevWish}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextWish}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </>
            )}

            {/* Dots indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {comments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index ? "bg-rose-500 w-4" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Comment Form */}
        <AnimatePresence>
          {isCommenting && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {CommentForm}
            </motion.div>
          )}
        </AnimatePresence>

        {comments.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Әзірше тілектер жоқ
          </div>
        )}
      </div>
    </section>
  );
}
