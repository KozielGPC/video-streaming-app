package service

import (
	"auth-server/internal/model"
	"auth-server/internal/repository"
)

type IKeyService interface {
	AuthStreamingKey(name, key string) (*model.Keys, error)
}

type keysService struct {
	keysRepository repository.IKeyRepository
}

func NewKeysService(repo repository.IKeyRepository) IKeyService {
	return &keysService{
		keysRepository: repo,
	}
}

func (sk *keysService) AuthStreamingKey(name, key string) (*model.Keys, error) {
	return sk.keysRepository.FindStreamKey(name, key)
}
