<template>
  <div class="game-platform">
    <!-- 左侧菜单 -->
    <div class="side-menu">
      <div class="logo">
        <el-icon><Platform /></el-icon>
      </div>
      
      <el-menu
        default-active="1"
        class="menu-list"
        background-color="transparent"
        text-color="#fff">
        <el-menu-item index="1">
          <el-icon><Monitor /></el-icon>
          <span>Dashboard</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><ShoppingCart /></el-icon>
          <span>My Basket</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><VideoPlay /></el-icon>
          <span>Stream</span>
        </el-menu-item>
      </el-menu>

      <div class="menu-section">
        <div class="section-title">BROWSE CATEGORIES</div>
        <el-menu
          background-color="transparent"
          text-color="#fff">
          <el-menu-item index="4">Bestsellers</el-menu-item>
          <el-menu-item index="5">Recently Updated</el-menu-item>
          <el-menu-item index="6">News</el-menu-item>
          <el-menu-item index="7">Special Offers</el-menu-item>
          <el-menu-item index="8">Virtual Reality</el-menu-item>
        </el-menu>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 顶部搜索栏 -->
      <div class="header">
        <el-input
          placeholder="Search name or type games, players..."
          prefix-icon="Search"
          class="search-input"
        />
        <div class="user-info">
          <span class="balance">23.821</span>
          <el-avatar>BZ</el-avatar>
        </div>
      </div>

      <!-- 游戏展示区 -->
      <div class="game-showcase">
        <h1>League of Legends</h1>
        <p>League of Legends is a fast-paced, competitive online game that blends the speed and intensity of an RTS with RPG elements.</p>
        <div class="action-buttons">
          <el-button type="primary">INSTALL GAME</el-button>
          <el-button>ADD TO FAVORITES</el-button>
        </div>
      </div>

      <!-- 特别优惠区 -->
      <div class="special-offers">
        <h2>SPECIAL OFFER</h2>
        <div class="offer-cards">
          <div class="offer-card">
            <div class="game-image"></div>
            <h3>Play Dead by Daylight</h3>
            <p>TRY IT FOR FREE</p>
            <el-button type="primary">PLAY</el-button>
          </div>
          <div class="offer-card">
            <div class="game-image"></div>
            <h3>Try Demo Resident Evil 2</h3>
            <p>EXP: 01:00</p>
            <el-button type="primary">PLAY</el-button>
          </div>
          <div class="offer-card">
            <div class="game-image"></div>
            <h3>Play Battlefield V</h3>
            <p>Play the demo version</p>
            <el-button type="primary">PLAY</el-button>
          </div>
        </div>
      </div>

      <!-- 畅销游戏区 -->
      <div class="bestsellers">
        <div class="section-header">
          <h2>BESTSELLERS</h2>
          <div class="navigation-buttons">
            <el-button circle><el-icon><ArrowLeft /></el-icon></el-button>
            <el-button circle><el-icon><ArrowRight /></el-icon></el-button>
          </div>
        </div>
        <div class="game-cards">
          <div class="game-card" v-for="game in bestsellers" :key="game.name">
            <div class="game-image"></div>
            <div class="game-info">
              <h3>{{ game.name }}</h3>
              <p>{{ game.price }}</p>
              <el-button type="primary">BUY NOW</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bestsellers = ref([
  { name: 'Horizon Zero Dawn', price: '45.95 USD' },
  { name: 'God of War', price: '39.99 USD' },
  { name: 'Red Dead Redemption', price: '59.99 USD' },
  { name: 'The Witcher 3: Wild Hunt', price: '29.99 USD' }
])
</script>

<style lang="scss" scoped>
.game-platform {
  display: flex;
  min-height: 100vh;
  background-color: #0f1623;
  color: #fff;
}

.side-menu {
  width: 260px;
  background-color: #131b2a;
  padding: 20px;

  .logo {
    margin-bottom: 30px;
    font-size: 24px;
    color: #4361ee;
  }

  .menu-section {
    margin-top: 30px;
    
    .section-title {
      padding: 10px;
      color: #4a5568;
      font-size: 12px;
      font-weight: 600;
    }
  }
}

.main-content {
  flex: 1;
  padding: 20px 40px;
  background-color: #0f1623;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    .search-input {
      width: 400px;
      :deep(.el-input__wrapper) {
        background-color: #131b2a;
        box-shadow: none;
        border: 1px solid #1d2839;
      }
      :deep(.el-input__inner) {
        color: #fff;
        &::placeholder {
          color: #4a5568;
        }
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 20px;
      
      .balance {
        color: #4361ee;
      }
    }
  }
}

.game-showcase {
  height: 400px;
  background: linear-gradient(rgba(15, 22, 35, 0.9), rgba(15, 22, 35, 0.9)), #131b2a;
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
    color: #fff;
  }

  p {
    color: #94a3b8;
  }

  .action-buttons {
    margin-top: 30px;
    display: flex;
    gap: 20px;
  }
}

.special-offers {
  margin-bottom: 40px;

  h2 {
    color: #fff;
    font-size: 24px;
  }

  .offer-cards {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    .offer-card {
      flex: 1;
      background: #131b2a;
      border-radius: 10px;
      padding: 20px;

      .game-image {
        height: 150px;
        background: #1d2839;
        border-radius: 8px;
        margin-bottom: 15px;
      }

      h3 {
        color: #fff;
        margin-bottom: 8px;
      }

      p {
        color: #4361ee;
        font-size: 14px;
        margin-bottom: 15px;
      }
    }
  }
}

.bestsellers {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      color: #fff;
      font-size: 24px;
    }
  }

  .game-cards {
    display: flex;
    gap: 20px;

    .game-card {
      flex: 1;
      background: #131b2a;
      border-radius: 10px;
      overflow: hidden;

      .game-image {
        height: 200px;
        background: #1d2839;
      }

      .game-info {
        padding: 15px;

        h3 {
          color: #fff;
          margin-bottom: 8px;
        }

        p {
          color: #4361ee;
          margin-bottom: 15px;
        }
      }
    }
  }
}

:deep(.el-menu) {
  border: none;
  background-color: transparent;
}

:deep(.el-menu-item) {
  color: #94a3b8 !important;
  
  &:hover, &.is-active {
    background-color: #1d2839 !important;
    color: #fff !important;
  }
}

:deep(.el-button) {
  border-radius: 8px;
}

.el-button {
  &.el-button--primary {
    background-color: #4361ee;
    border-color: #4361ee;
    
    &:hover {
      background-color: #3651d4;
      border-color: #3651d4;
    }
  }

  &.is-plain {
    color: #94a3b8;
    border-color: #1d2839;
    
    &:hover {
      color: #fff;
      background-color: #1d2839;
    }
  }
}
</style> 