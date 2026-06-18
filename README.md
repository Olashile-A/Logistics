Here’s a clean **README-ready section** you can drop directly into your project:

---

## 🧠 Architecture Overview & Real-Time State Management

### Overview

This project is a logistics dashboard that simulates real-time delivery updates. It supports filtering, pagination, and live status changes without requiring page refreshes. The main focus of the architecture is maintaining consistent real-time UI updates while keeping the system simple and predictable.

---

### Initial Approach

The first implementation used a layered architecture:

* **Next.js API routes** for fetching paginated delivery data
* **MockDataService** as an in-memory fallback data source
* **React Query** for caching, fetching, and pagination
* **Simulator service (setInterval)** to randomly update delivery statuses
* **UI components** consuming React Query data


---

### Challenges

While functional, this approach introduced several issues:

* Multiple sources of truth (API, mock service, React Query cache)

---

### Final Approach (Zustand-based Architecture)

The system was refactored to use **Zustand as the single source of truth** for delivery state.

#### Key changes:

* All delivery data is stored in a **Zustand global store**
* The simulator directly updates Zustand state
* UI components subscribe directly to the store
* React Query is no longer used for simulated data updates

#### Real-time flow:

```
Simulator → Zustand Store → UI Re-render
```

---

### Why This Approach Works Better

* **Single source of truth** eliminates state inconsistencies
* **Direct state updates** enable instant UI reactivity
* **No cache invalidation required**, improving performance
* **Simplified architecture** with fewer moving parts
* **Predictable state flow** for real-time updates

---

### Key Design Decisions

* Chose **Zustand** for lightweight global state management
* Used **in-memory mock generation** for deterministic simulation
* Decoupled simulator logic from API and UI layers

---

### Future Improvements

If given more time, the following enhancements would be implemented:

* Add **list virtualization (e.g. react-window)** for large datasets (10k+ rows)
* Introduce a **hybrid mode** supporting both real API (React Query) and simulation mode (Zustand toggle)
* Implement an **event log / audit trail** for delivery status changes
* Explore **WebSocket-based real-time updates** for production-grade behavior

---

